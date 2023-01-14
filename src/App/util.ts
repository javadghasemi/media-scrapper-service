import {ProviderEnum} from "./Enum/provider.enum";
import {ScraperException} from "./Exception/scraper.exception";
import {ProviderNotFound} from "./error";

export function specifyProvider(url: string): ProviderEnum {
  if (/soundcloud/g.test(url)) {
    return ProviderEnum.SOUNDCLOUD;
  }

  throw new ScraperException(ProviderNotFound.message, ProviderNotFound.code);
}