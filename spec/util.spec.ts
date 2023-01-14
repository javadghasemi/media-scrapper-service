import {describe, expect, test} from "@jest/globals";

import {specifyProvider} from "../src/util";
import {Provider} from "../src/Enum/Provider";

describe('Utilities test', () => {
  test('specify provider - soundcloud', () => {
    expect(specifyProvider('https://soundcloud.com/mohsennamjoo/navid')).toBe(Provider.SOUNDCLOUD);
  });

  test('specify provider - unknown provider', () => {
    expect(specifyProvider('https://unknown.com/mohsennamjoo/navid')).toBeUndefined();
  });
});