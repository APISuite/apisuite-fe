import React, { useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { useTranslation, Box, Card, CardMedia, Icon, Typography } from "@apisuite/fe-base";
import useStyles from "./styles";
import { MediaProps } from "./types";

export const MediaUpload: React.FC<MediaProps> = ({
  onFileLoaded,
  onDeletePressed,
  images = [],
  accept = "image/*",
  helperText,
}) => {
  const classes = useStyles();
  const [t] = useTranslation();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      onFileLoaded(acceptedFiles);
    }
  }, [onFileLoaded]);

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: accept, onDrop, maxSize: 2000000 });

  const files = () => {
    return images.map((url: string, index: number) => (
      <Box key={`app-image-${index}`}>
        <Card variant="outlined" className={classes.media}>
          <CardMedia
            className={classes.mediaImg}
            component="img"
            image={url}
          />
          <Box className={classes.overlay}>
            <Icon
              className={clsx(classes.mediaUpload, classes.delete)}
              onClick={() => onDeletePressed(url)}
            >
              delete
            </Icon>
          </Box>
        </Card>
      </Box>
    ));
  };

  const rejectedFilesErrors = fileRejections.map(({ file, errors }) => (
    <div className={classes.mediaError} key={file.name}>
      <Typography variant="caption" display="block" gutterBottom>
        {file.name}
      </Typography>
      <div>
        {errors.map(e => (
          <Typography key={e.code} variant="caption" display="block" gutterBottom>
            {e.message}
          </Typography>
        ))}
      </div>
    </div>
  ));

  return (
    <Box>
      <Box alignItems="center" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
        {files()}
        <Box
          className={clsx(
            classes.mediaUpload,
            classes.upload,
            isDragActive && classes.activeStyle,
            isDragAccept && classes.acceptStyle,
            isDragReject && classes.rejectStyle,
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon className={classes.mediaIcon}>add_photo_alternate</Icon>
          <Typography className={classes.mediaText} variant="body1" display="block" gutterBottom>
            {t("mediaUpload.dragdrop")}
          </Typography>
        </Box>
        <Box width="100%">
          {rejectedFilesErrors}
        </Box>
      </Box>
      <Typography className={classes.helperText} variant="body2" display="block" gutterBottom>
        {helperText || t("mediaUpload.helperText")}
      </Typography>
    </Box>
  );
};
