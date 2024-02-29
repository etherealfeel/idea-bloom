'use client';
import { UserRoundCog } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/DropdownMenu';
import { Avatar, AvatarImage } from '@components/ui/Avatar';
import { SignOutButton, useUser } from '@clerk/clerk-react';

const UserItem = () => {
    const { user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    role="button"
                    className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
                >
                    <div className="flex items-center max-w-[150px] gap-x-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="text-start text-md line-clamp-1">
                            {user?.fullName}
                        </span>
                    </div>
                    <UserRoundCog className="w-5 h-5 ml-2 text-muted-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="rounded-md bg-secondary p-2">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <div className="spacy-y-1">
                            <p className="text-md line-clamp-1">
                                {user?.fullName}
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="w-full cursor-pointer text-muted-foreground"
                    asChild
                >
                    <SignOutButton>Sign Out</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserItem;
