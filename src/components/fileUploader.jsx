import React, {useMemo, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

function FileUploader(props){
  const{jsonFile, handleUploadJsonFile} = props

  const {acceptedFiles, 
      getRootProps, 
      getInputProps, 
      isFocused,
      isDragAccept,
      isDragReject} = useDropzone({accept: 'application/json', multiple:false});

  const files = acceptedFiles.map(file=>(
    <div>
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={"/simple-building-calculator/img/json.icon.PNG"} alt={""} style={img}/>
        </div>
      </div>
      <p><strong>{file.path}</strong>-{file.size} bytes</p>
    </div>

  ));

  useEffect(() => {
    if(acceptedFiles.length === 1 && jsonFile !== acceptedFiles){
      let reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result;
        handleUploadJsonFile(JSON.parse(contents));
      };
      reader.readAsText(acceptedFiles[0]);
    }
  }, [acceptedFiles, jsonFile]);

  const style = useMemo(() => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isFocused,
      isDragAccept,
      isDragReject
    ]);

  return(
      <section className="container">
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop json file here, or click to select a file</p>
        </div>
        <aside style={thumbsContainer}>
            {files}
        </aside>
    </section>
    )
}


export default FileUploader