function getCloudinaryPublicId(url: string): string {
  const regex = /\/upload\/(?:v\d+\/)?(.+?)\.(?:jpg|jpeg|png|webp|gif)$/;
  const match = url.match(regex);
  return match?.[1] ?? url;
}

export default getCloudinaryPublicId;
