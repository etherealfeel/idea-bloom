'use client';

import { Dialog, DialogHeader, DialogContent } from '@components/ui/Dialog';
import { Label } from '@components/ui/Label';
import { useSettingsStore } from '@hooks/useSettingsStore';
import { ModeToggle } from '@components/ModeToggle';

import React from 'react';

const SettingsModal = () => {
    const settings = useSettingsStore();
    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">Settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Appearance</Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
