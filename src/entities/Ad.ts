export interface IAd {
  id: string;
  imgUrl: string;
  targetUrl: string;
}

class Ad implements IAd {
  public id: string;
  public imgUrl: string;
  public targetUrl: string;

  constructor(id: string, imgUrl: string, targetUrl: string) {
    this.id = id;
    this.imgUrl = imgUrl;
    this.targetUrl = targetUrl;
  }
}

export default Ad;