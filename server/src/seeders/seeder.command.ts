// src/seeders/seeder.command.ts
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { SeederService } from './seeder.service';

@Injectable()
export class SeederCommand { // Add export here
  constructor(private readonly seederService: SeederService) {}

  @Command({
    command: 'seed',
    describe: 'Seed the database with initial data',
  })
  async seed() {
    try {
      await this.seederService.seed();
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Seeding failed:', error.message);
      throw error;
    }
  }
}