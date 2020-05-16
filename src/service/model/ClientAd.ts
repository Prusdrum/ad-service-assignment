export interface IClientAd {
  imgUrl: string;
  redirectUrl: string;
}

class ClientAd implements IClientAd {
  public imgUrl: string;
  public redirectUrl: string;

  constructor(imgUrl: string, redirectUrl: string) {
    this.imgUrl = imgUrl;
    this.redirectUrl = redirectUrl;
  }
}

export default ClientAd;