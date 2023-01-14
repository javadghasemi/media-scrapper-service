import {beforeAll, describe, expect, jest, test} from "@jest/globals";
import {getMockReq, getMockRes} from "@jest-mock/express";
import {Client} from "soundcloud-scraper";

import {ScraperController} from "../src/App/Controller/scraper.controller";

jest.mock('soundcloud-scraper');

describe('Media Scraper Service Component Test', () => {
  let scrapperController: ScraperController;

  describe('Soundcloud', () => {
    beforeAll(() => {
    });

    test('get track info - success', async () => {
      const requestUrl = 'https://soundcloud.com/mohsennamjoo/vatan';

      const getSongInfo = jest.fn();
      // @ts-ignore
      Client.prototype.getSongInfo = getSongInfo;
      // @ts-ignore
      getSongInfo.mockReturnValue(Promise.resolve({
        id: 1390838131,
        title: 'Vatan',
        thumbnail: 'https://i1.sndcdn.com/artworks-UCD7a3H7mGIS1PK9-R9HVJA-t500x500.jpg',
        url: requestUrl
      }));

      scrapperController = new ScraperController();
      const request = getMockReq({query: {url: requestUrl}});
      const {res} = getMockRes();

      // @ts-ignore
      await scrapperController.info(request, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          track_id: 1390838131,
          source_url: requestUrl,
          title: 'Vatan',
          thumbnail: 'https://i1.sndcdn.com/artworks-UCD7a3H7mGIS1PK9-R9HVJA-t500x500.jpg'
        })
      );
    });
  })
});