export function filesToObjectUrl(copyMessage: any) {
  const fileUrls = copyMessage.files?.map((el: any) => {
    const blob = new Blob([el], { type: 'application/octet-stream' })
    const fileUrl = URL.createObjectURL(blob)
    return fileUrl
  })

  copyMessage.fileUrls = fileUrls
}
