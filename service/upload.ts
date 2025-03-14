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