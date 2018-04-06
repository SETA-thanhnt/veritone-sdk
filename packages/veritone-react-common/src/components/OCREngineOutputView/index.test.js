import React from 'react';
import { mount } from 'enzyme';

import EngineOutputHeader from '../EngineOutputHeader';
import OCREngineOutputView from './';

const ocrAssets = [
  {
    startTimeMs: 0,
    endTimeMs: 22000,
    sourceEngineId: '9a6ac62d-a881-8884-6ee0-f15ab84fcbe2',
    sourceEngineName: 'Cortex',
    taskId:
      '23969da8-c532-46ae-b4cf-b002d44b31ce-82e4453e-b1a9-425f-8b5c-488915939bac',
    series: [
      {
        end: 1000,
        start: 0,
        object: {
          text:
            'WITH \n DEVELOPING NOW \n TED CRUZ GAINING IN POLLS AND FUND-RAISING CNN \n Sara Murray CNW Political Reporter \n LIVE \n NAS58.43 \n AONY ON CHAMPS-ELYSEES, MAYOR SAYS \n U.S. TIGHTENING SECURITY I SITUATION ROOM \n '
        }
      },
      {
        end: 2000,
        start: 1000,
        object: {
          text:
            'WITH \n DEVELOPING NOW \n TED CRUZ GAINING IN POLLS AND FUND-RAISING CNN \n Sara Murray CNW Political Reporter \n LIVE \n NAS -58.43 \n IONY ON CHAMPS-ELYSEES, MAYOR SAYS \n U.S. TIGHTENING SECURITY It SITUATION ROOM \n '
        }
      }
    ]
  }
];

describe('OCREngineOutputView', () => {
  it('should have a header', () => {
    const wrapper = mount(<OCREngineOutputView data={ocrAssets} />);

    expect(wrapper.find(EngineOutputHeader)).toHaveLength(1);
  });

  it('should have a content area', () => {
    const wrapper = mount(<OCREngineOutputView data={ocrAssets} />);

    expect(wrapper.find('.ocrContent')).toHaveLength(1);
  });

  it('should display a list of ocr objects', () => {
    const wrapper = mount(<OCREngineOutputView data={ocrAssets} />);

    expect(wrapper.find('.ocrContainer')).toHaveLength(
      ocrAssets[0].series.length
    );
  });
});