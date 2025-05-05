import {
    HouseIcon,
    Grid2x2Icon,
    GraduationCapIcon,
    UserRoundPenIcon,
    MessagesSquareIcon,
    LayersIcon,
    StickyNoteIcon,
    BookOpenIcon,
    BriefcaseIcon,
    CodeIcon,
    FileTextIcon,
    UsersIcon,
    MessageCircleIcon,
    SettingsIcon,
    ChevronRight,
    PencilIcon,
} from "lucide-react";
import Image from 'next/image';
import React, { useState } from 'react'

interface SideMenuOption {
    title: string;
    icon: any;
    subCategories?: SideMenuOption[];
}

const SideBar = () => {
    const [open, setOpen] = useState(true);


    const SideMenuOptions: SideMenuOption[] = [
        { title: "Dashboard", icon: <HouseIcon /> },
        {
            title: "Categories",
            icon: <Grid2x2Icon />,
            subCategories: [
                { title: "Education", icon: <GraduationCapIcon /> },
                { title: "Business", icon: <BriefcaseIcon /> },
                { title: "Technology", icon: <CodeIcon /> },
                { title: "Literature", icon: <BookOpenIcon /> },
            ],
        },
        {
            title: "Manage Roles",
            icon: <UserRoundPenIcon />,
            subCategories: [
                { title: "Admins", icon: <UsersIcon /> },
                { title: "Editors", icon: <UserRoundPenIcon /> },
                { title: "Moderators", icon: <UserRoundPenIcon /> },
            ],
        },
        {
            title: "Feedbacks",
            icon: <MessagesSquareIcon />,
            subCategories: [
                { title: "Create Feedback", icon: <PencilIcon /> },
            ],
        },
        {
            title: "Pages",
            icon: <LayersIcon />,
            subCategories: [
                { title: "Home", icon: <HouseIcon /> },
                { title: "About Us", icon: <FileTextIcon /> },
                { title: "Contact", icon: <MessageCircleIcon /> },
            ],
        },
        {
            title: "Posts",
            icon: <StickyNoteIcon />,
            subCategories: [
                { title: "Published", icon: <FileTextIcon /> },
                { title: "Drafts", icon: <FileTextIcon /> },
            ],
        },
        {
            title: "Settings",
            icon: <SettingsIcon />,
            subCategories: [
                { title: "General", icon: <SettingsIcon /> },
                { title: "Security", icon: <SettingsIcon /> },
            ],
        },
    ];


    return (
        <div className='flex fixed top-0 pt-20 left-0 h-full w-[300px] flex-col items-center gap-4 bg-white px-6 font-sans shadow-lg'>
            <div className='flex w-full flex-col gap-4'>
                {
                    SideMenuOptions.map((option, index) => (
                        <div key={`option-${index}`} className="gap-4 flex flex-col">
                            <Option {...option} />
                            <Divider />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const Option = (props: SideMenuOption) => {
    const [open, setOpen] = useState(false);
    return (
        <div className='flex flex-col'>
            <div
                className='flex cursor-pointer flex-wrap items-center justify-start gap-4 font-[400]'
                onClick={() => setOpen(s => !s)}
            >
                {props.icon}
                {props.title}
                {
                    props.subCategories &&
                    <ChevronRight
                        stroke='#00000099'
                        className={`${open ? "rotate-90" : "rotate-0"} ml-auto transition-[rotate]`}
                    />
                }
            </div>
            {
                props.subCategories &&
                <>
                    <div className={`${open ? "h-max mt-4" : "h-0"} ml-4 flex flex-col gap-2 overflow-hidden border-l-2 border-black/20 pl-4 transition-all`}>
                        {
                            props.subCategories.map((option, index) => <Option {...option} key={`suboption-${props.title}-${index}`} />)
                        }
                    </div>
                </>
            }
        </div>
    )
}

const Divider = () => <div className='h-0.5 w-full bg-black/10' />


export default SideBar;
