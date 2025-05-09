import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { FeedbackForm } from './entities/feedback-form.entity';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { response } from 'express';

@Injectable()
export class FeedbackFormService {
    constructor(
        @InjectRepository(FeedbackForm)
        private readonly feedbackFormRepository: Repository<FeedbackForm>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Subcategory)
        private readonly subcategoryRepository: Repository<Subcategory>,
    ) {}

    async create(createFeedbackFormDto: CreateFeedbackFormDto): Promise<FeedbackForm> {
        const { categoryId, subCategoryId, authorId, ...rest } = createFeedbackFormDto;

        // Fetch user and category
        const user = await this.userRepository.findOne({ where: { id: authorId } });
        if (!user) throw new NotFoundException(`User with ID ${authorId} not found`);

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const subcategory = await this.subcategoryRepository.findOne({ where: { id: subCategoryId } });
        if (!subcategory) throw new NotFoundException(`SubCategory with ID ${subCategoryId} not found`);

        // Create new FeedbackForm
        const feedbackForm = this.feedbackFormRepository.create({
            ...rest,
            category,
            subcategory,
            author: user,
        });

        return await this.feedbackFormRepository.save(feedbackForm);
    }

    async getGroupedResponsesBySchool() {
        const forms = await this.feedbackFormRepository.find({
            relations: [
                'category',
                'subcategory',
                'responses',
                'responses.author',
                'responses.feedbackForm',
                'responses.feedbackForm.category',
            ],
        });

        const allResponses = forms.flatMap(form =>
            form.responses.filter(response => response.accepted)
        );

        const schoolGroups: Record<string, FeedbackResponse[]> = {};
        const principalGroups: Record<string, FeedbackResponse[]> = {};

        for (const response of allResponses) {
            const details = response.details;

            const schoolName = details?.schoolName?.trim();
            const schoolWebsite = details?.schoolWebsite?.trim();
            const schoolCountry = details?.schoolCountry?.trim();
            const pricipalName = details?.pricipalName?.trim();

            const hasValidSchool = schoolName && schoolWebsite && schoolCountry && !pricipalName;

            // Build school group key
            const schoolKey = hasValidSchool ? [schoolName, schoolWebsite, schoolCountry].join('|') : null;

            // Build principal group key
            const principalKey = pricipalName && schoolName ? [pricipalName, schoolName].join('|') : null;

            // Group by school
            if (schoolKey) {
                if (!schoolGroups[schoolKey]) {
                    schoolGroups[schoolKey] = [];
                }
                schoolGroups[schoolKey].push(response);
            }

            // Group by principal only if valid
            if (principalKey) {
                if (!principalGroups[principalKey]) {
                    principalGroups[principalKey] = [];
                }
                principalGroups[principalKey].push(response);
            }
        }

        const schoolGroupResults = Object.entries(schoolGroups).map(([key, responses]) => {
            const [schoolName, schoolWebsite, schoolCountry] = key.split('|');
            responses.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            return {
                groupType: 'school',
                schoolName,
                schoolWebsite,
                schoolCountry,
                details: responses[0].details,
                responses,
            };
        });

        const principalGroupResults = Object.entries(principalGroups).map(([key, responses]) => {
            const [pricipalName, schoolName] = key.split('|');
            responses.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            return {
                groupType: 'principal',
                pricipalName,
                schoolName,
                details: responses[0].details,
                responses,
            };
        });

        const combinedResults = [...schoolGroupResults, ...principalGroupResults].sort((a, b) => {
            const latestA = a.responses[0]?.submittedAt;
            const latestB = b.responses[0]?.submittedAt;
            return new Date(latestB).getTime() - new Date(latestA).getTime();
        });

        return combinedResults;
    }

    async findAll(): Promise<FeedbackForm[]> {
        const forms = await this.feedbackFormRepository.find({
            relations: ['category', 'subcategory', 'responses', 'responses.author', 'responses.feedbackForm.category'],
        });

        return forms.map(form => ({
            ...form,
            responses: form.responses.filter(r => r.accepted),
        }));
    }

    async findOne(id: number): Promise<FeedbackForm> {
        const feedbackForm = await this.feedbackFormRepository.findOne({
            where: { id },
            relations: ['author', 'category', 'subcategory', 'responses', 'responses.author'],
        });

        if (!feedbackForm) throw new NotFoundException(`FeedbackForm with ID ${id} not found`);

        feedbackForm.responses = feedbackForm.responses.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

        return feedbackForm;
    }

    async findByCategoryId(categoryId: number): Promise<FeedbackForm[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const forms = await this.feedbackFormRepository.find({
            where: { category },
            relations: ['author', 'category', 'subcategory', 'responses', 'responses.author'],
        });

        return forms
            .map(form => ({
                ...form,
                responses: form.responses.filter(r => r.accepted).sort((a, b) =>
                    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                ),
            }))
            .sort((a, b) => {
                const latestA = a.responses[0]?.submittedAt;
                const latestB = b.responses[0]?.submittedAt;
                return new Date(latestB).getTime() - new Date(latestA).getTime();
            });
    }

    async findByCategoryAndSubcategory(categoryId: number, subcategoryId: number): Promise<FeedbackForm[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const subcategory = await this.subcategoryRepository.findOne({
            where: { id: subcategoryId, parentCategory: category },
        });
        if (!subcategory) throw new NotFoundException(`Subcategory with ID ${subcategoryId} not found in Category ${categoryId}`);

        const forms = await this.feedbackFormRepository.find({
            where: { category, subcategory },
            relations: ['author', 'category', 'subcategory', 'responses', 'responses.author'],
        });

        return forms.map(form => ({
            ...form,
            responses: form.responses.filter(r => r.accepted),
        }));
    }

    async remove(id: number): Promise<void> {
        const result = await this.feedbackFormRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`FeedbackForm with ID ${id} not found`);
        }
    }

}
