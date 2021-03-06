import InfoBox from "../InfoBox";
import MarkerClusterer from "../MarkerClusterer";
import CanvasLayer from "../CanvasLayer";
import PixiLayer from "../PixiLayer";

describe(`addons`, () => {
  describe(`InfoBox`, () => {
    it(`should be exported`, () => {
      expect(InfoBox).toBeDefined();
    });
  });

  describe(`MarkerClusterer`, () => {
    it(`should be exported`, () => {
      expect(MarkerClusterer).toBeDefined();
    });
  });

  describe(`CanvasLayer`, () => {
    it(`should be exported`, () => {
      expect(CanvasLayer).toBeDefined();
    })
  });

  describe(`PixiLayer`, () => {
    it(`should be exported`, () => {
      expect(PixiLayer).toBeDefined();
    })
  });
});
