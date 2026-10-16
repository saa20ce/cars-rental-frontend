'use client';

import { Image as AntImage } from 'antd';
import { useRef } from 'react';
import DraggablePreviewImage from './DraggablePreviewImage';
import './CarImagePreview.css';

interface CarImagePreviewProps {
    images: string[];
    carName: string;
    visible: boolean;
    current: number;
    onVisibleChange: (visible: boolean) => void;
    onCurrentChange: (index: number) => void;
}

export default function CarImagePreview({
    images,
    carName,
    visible,
    current,
    onVisibleChange,
    onCurrentChange,
}: CarImagePreviewProps) {
    const previewDirection = useRef(0);

    return (
        <AntImage.PreviewGroup
            items={images.map((url, index) => ({
                src: url,
                alt: `${carName} — фото ${index + 1}`,
            }))}
            preview={{
                visible,
                current,
                imageRender: (image, { transform, current: imageIndex }) => (
                    <DraggablePreviewImage
                        key={imageIndex}
                        image={image}
                        scale={transform.scale}
                        canGoPrevious={imageIndex > 0}
                        canGoNext={imageIndex < images.length - 1}
                        enterDirection={previewDirection.current}
                        visible={visible}
                        onSwipe={(direction) => {
                            previewDirection.current = direction;
                            onCurrentChange(
                                Math.max(
                                    0,
                                    Math.min(
                                        images.length - 1,
                                        current + direction,
                                    ),
                                ),
                            );
                        }}
                    />
                ),
                onVisibleChange,
                onChange: (index) => {
                    previewDirection.current = index > current ? 1 : -1;
                    onCurrentChange(index);
                },
                countRender: (imageIndex, total) => `${imageIndex} из ${total}`,
                styles: {
                    mask: {
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                    },
                },
                toolbarRender: (_, { icons }) => (
                    <div className="ant-image-preview-operations">
                        {icons.zoomOutIcon}
                        {icons.zoomInIcon}
                    </div>
                ),
            }}
        />
    );
}
