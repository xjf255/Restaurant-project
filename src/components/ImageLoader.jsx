import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import '../styles/InputFile.css';

export const ImageLoader = ({ onUploadSuccess }) => {
  const [imageUrl, setImageUrl] = useState('');

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'restaurant_upload'); // Cambia por tu preset
      formData.append('folder', 'AntiguaBurguers'); // Carpeta en Cloudinary

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dkshw9hik/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir imagen: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    },
    onSuccess: async (url) => {
      setImageUrl(url);
      try {
        const backendResponse = await fetch('http://localhost:8080/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: url }),
        });

        if (!backendResponse.ok) {
          throw new Error('Error al enviar URL al backend');
        }

        onUploadSuccess?.(url);
      } catch (error) {
        console.error('Error al enviar URL al backend:', error);
      }
    },
    onError: (error) => {
      console.error('Error al subir imagen:', error);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="image-loader">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploadMutation.isPending}
      />
      {uploadMutation.isPending && <p>Subiendo imagen...</p>}
      {uploadMutation.isError && <p>Error: {uploadMutation.error.message}</p>}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
};