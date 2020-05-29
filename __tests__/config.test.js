const { getImageConfig, getScreenshotConfig } = require('../src/config');

describe('config', () => {
  it('getImageConfig', () => {
    const config = { taskOptions: {
      imageConfig: {
        threshold: 0.5,
        bar: 'should be included',
      },
      foo: 'should be ignored',
    }};

    expect(getImageConfig(config)).toEqual({
      bar: 'should be included',
      createDiffImage: true,
      resizeDevicePixelRatio: true,
      threshold: 0.5,
      thresholdType: 'percent',
    });
  });

  it('getScreenshotConfig', () => {
    const config = { taskOptions: {
      log: true,
      clip: {
        x: 0,
        y: 0,
        height: 100,
        width: 100,
      },
      onBeforeScreenshot: 'some function'
    }};

    expect(getScreenshotConfig(config)).toEqual({
      blackout: ['.snapshot-diff'],
      capture: 'fullPage',
      clip: {
        x: 0,
        y: 0,
        height: 100,
        width: 100,
      },
      disableTimersAndAnimations: true,
      log: true,
      onBeforeScreenshot: 'some function',
      scale: false,
      timeout: 30000,
    });
  });
});
