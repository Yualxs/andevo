'use client';

import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Importamos el CSS para que se parezca al de Webflow
import './FilepondInput.css';

// Registrar plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

export const FilepondInput = () => {
  const [files, setFiles] = useState<any[]>([]);

  return (
    <div className="form_upload-div">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        maxFileSize="5MB"
        name="fileToUpload" 
        labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action">explora</span>'
        acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf', 'video/mp4']}
      />
      <div className="mt-4 text-center text-sm text-black/50">
        <p>Formatos compatibles: PNG, JPG, PDF, MP4</p>
        <p>Tamaño máximo: 5 MB</p>
      </div>
    </div>
  );
};