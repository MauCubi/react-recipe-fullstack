export const imageUpload = async( file: File ) => {

    if ( !file ) {
        throw new Error('No hay archivo a subir');
    }

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dcavctpft/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-recipes');
    formData.append('file', file);

    try {
        
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        
        if ( !resp.ok ) {
            throw new Error('No se pudo subir imagen');
        }

        const cloudResp = await resp.json();        
        return cloudResp.secure_url;

    } catch (error) {        
        if (error instanceof Error) {            
            throw new Error( error.message);
        }
    }
}