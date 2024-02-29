'use client';
import { Dialog, DialogHeader, DialogContent } from '@components/ui/Dialog';
import { useImageStore } from '@hooks/useImageStore';
import { SingleImageDropzone } from '@components/SingleImageDropzone';
import { useState } from 'react';
import { useEdgeStore } from '@lib/edgestore';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@convex/_generated/dataModel';

const CoverImageModal = () => {
    const params = useParams();

    const coverImage = useImageStore();
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();

    const update = useMutation(api.documents.update);

    const handleClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };

    const handleChange = async (file?: File) => {
        if (!file) return;
        setIsSubmitting(true);
        setFile(file);

        const res = await edgestore.publicFiles.upload({
            file,
            options: {
                replaceTargetUrl: coverImage.url,
            },
        });

        await update({
            id: params.documentId as Id<'documents'>,
            coverImage: res.url,
        });

        handleClose();
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={handleChange}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CoverImageModal;
