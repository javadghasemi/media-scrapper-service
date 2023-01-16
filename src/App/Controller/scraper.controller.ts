import {NextFunction, Request, Response} from "express";
import {Client as SoundcloudClient, Song} from "soundcloud-scraper";

import {specifyProvider} from "../util";
import {ProviderEnum} from "../Enum/provider.enum";
import {InvalidUrl, ProviderNotFound, UnexpectedError} from "../error";
import {ScraperException} from "../Exception/scraper.exception";

type Information = {
  track_id: string | number,
  title: string,
  thumbnail: string,
  source_url: string
};

export class ScraperController {
  private soundcloud: SoundcloudClient;

  constructor() {
    this.soundcloud = new SoundcloudClient();
  }

  public async info(request: Request<{}, {}, {}, { url: string }>, response: Response, next: NextFunction): Promise<void> {
    try {
      const url: string = request.query.url;
      const provider: ProviderEnum = specifyProvider(url);
      const songInfo: Information = await this.getInfo(url, provider);

      response.json(songInfo);
    } catch (e: any) {

      next(e);
      // response.statusCode = 500;
      // let errorRes: { code: string, message: string } = UnexpectedError;
      //
      // if (e instanceof ScraperException || e.message === InvalidUrl.message) {
      //   response.statusCode = 404;
      //   errorRes = {
      //     code: e.code,
      //     message: e.message
      //   }
      // } else if (e.message === InvalidUrl.message) {
      //   response.statusCode = 404;
      //   errorRes = InvalidUrl;
      // }
      //
      // response.json(errorRes);
    }
  }

  public async download(request: Request, response: Response): Promise<void> {
    try {
      const url: string = request.body.url;
      const provider: ProviderEnum = specifyProvider(url);

      switch (provider) {
        case ProviderEnum.SOUNDCLOUD:
          const song: Song = await this.soundcloud.getSongInfo(url);
          if (song) {
            const stream = await song.downloadProgressive();

            response.setHeader('Content-Type', 'audio/mpeg');
            stream.pipe(response);
          }
      }
    } catch (e: any) {
      response.statusCode = 500;
      let errorRes: { code: string, message: string } = UnexpectedError;

      if (e instanceof ScraperException || e.message === InvalidUrl.message) {
        response.statusCode = 404;
        errorRes = {
          code: e.code,
          message: e.message
        }
      } else if (e.message === InvalidUrl.message) {
        response.statusCode = 404;
        errorRes = InvalidUrl;
      }

      response.json(errorRes);
    }
  }

  private async getInfo(url: string, provider: ProviderEnum | undefined): Promise<Information> {
    switch (provider) {
      case ProviderEnum.SOUNDCLOUD:
        const songInfo: Song = await this.soundcloud.getSongInfo(url);
        return {
          track_id: songInfo.id,
          title: songInfo.title,
          thumbnail: songInfo.thumbnail,
          source_url: songInfo.url
        };
    }

    throw new ScraperException(ProviderNotFound.message, ProviderNotFound.code, ProviderNotFound.statusCode);
  }
}
