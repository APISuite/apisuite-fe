import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useTranslation, Avatar, Box, Grid, Icon, Paper, Typography } from "@apisuite/fe-base";
import { deleteMedia } from "store/media/actions/deleteMedia";
import { uploadMedia } from "store/media/actions/uploadMedia";
import useStyles from "./styles";
import { mediaSelector } from "./selector";
import { AvatarDropzoneProps } from "./types";

export const AvatarDropzone: React.FC<AvatarDropzoneProps> = ({
  accept = "image/*",
  helperText,
  image,
  maxSize = 2000000,
  onFileLoaded,
  onDeletePressed,
}) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { orgId, media } = useSelector(mediaSelector);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      const formData = new FormData();
      for (const file of acceptedFiles) {
        formData.append(file.name, file);
      }
      dispatch(uploadMedia({
        file: formData,
        orgId,
      }));
    }
  }, [dispatch, orgId]);

  useEffect(() => {
    if (!media.isRequesting && media.media.savedObjects && media.media.savedObjects.length) {
      onFileLoaded(media.media.savedObjects[0].url);
    }
  }, [media, onFileLoaded]);

  const onDelete = (org: number, url: string) => {
    dispatch(deleteMedia({ orgId: org, url }));
    onDeletePressed();
  };

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: accept, onDrop, maxSize });

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
      <Grid  alignItems="center" container direction="column" justify="center" spacing={2}>
        <Grid item xs={12}>
          {!image &&
            <Paper
              className={clsx(
                classes.mediaContainer,
                classes.mediaUpload,
                isDragActive && classes.activeStyle,
                isDragAccept && classes.acceptStyle,
                isDragReject && classes.rejectStyle,
              )}
              variant="outlined"
              {...getRootProps()}
            >
              <Box alignItems="center" display="flex" flexDirection="column">
                <input {...getInputProps()} />
                <Icon fontSize="large" className={classes.mediaIcon}>add_photo_alternate</Icon>
                <Typography className={classes.mediaText} variant="caption" display="block" gutterBottom>
                  {t("avatarDropzone.dragdrop")}
                </Typography>
              </Box>
            </Paper>
          }
          {image &&
            <Paper
              className={classes.mediaContainer}
              style={{ display: "flex", justifyContent: "center", padding: 0 }}
              variant="outlined"
            >
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  alt="logo"
                  src={image}
                  className={classes.avatar}
                />
                <Box className={classes.overlay}>
                  <Icon
                    className={clsx(classes.mediaUpload, classes.delete)}
                    fontSize="large"
                    onClick={() => onDelete(orgId, image)}
                  >
                    delete
                  </Icon>
                </Box>
              </Box>
            </Paper>
          }
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.helperText} variant="caption" display="block" gutterBottom>
            {helperText || t("avatarDropzone.helperText")}
          </Typography>
          {rejectedFilesErrors}
        </Grid>
      </Grid>
    </Box>
  );
};
