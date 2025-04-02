import { IResult } from "@/types";
import { service } from ".";

export const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    service.post('/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const uploadImages = (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }
    service.post('/upload/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const uploadImageByUri = (uri: string) => {
    const formData = new FormData();
    formData.append('image', { uri, type: 'image/jpeg', name: 'image.jpg' } as unknown as Blob);
    return service.post('/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const uploadImagesByUris = async (uris: string[]): IResult<string[]> => {
    const formData = new FormData();
    for (let i = 0; i < uris.length; i++) {
        formData.append('images', { uri: uris[i], type: 'image/jpeg', name: 'image.jpg' } as unknown as Blob);
    }
    const res = await service.post('/upload/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data;
}