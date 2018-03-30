import React from 'react';
import update from 'immutability-helper';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import {
  TranscriptSearchModal,
  TranscriptDisplay,
  TranscriptConditionGenerator
} from '../TranscriptSearchModal';
import {
  SentimentSearchModal,
  SentimentDisplay,
  SentimentConditionGenerator
} from '../SentimentSearchModal';
import {
  FingerprintSearchModal,
  FingerprintDisplay,
  FingerprintConditionGenerator
} from '../FingerprintSearchModal';
import {
  FaceSearchModal,
  FaceDisplay,
  FaceConditionGenerator
} from '../FaceSearchModal';
import {
  ObjectSearchModal,
  ObjectDisplay,
  ObjectConditionGenerator
} from '../ObjectSearchModal';
import {
  RecognizedTextSearchModal,
  RecognizedTextDisplay,
  RecognizedTextConditionGenerator
} from '../RecognizedTextSearchModal';
import {
  LogoSearchModal,
  LogoDisplay,
  LogoConditionGenerator
} from '../LogoSearchModal';
import {
  TagSearchModal,
  TagDisplay,
  TagConditionGenerator
} from '../TagSearchModal';
import {
  StructuredDataModal,
  StructuredDataDisplay,
} from '../StructuredDataModal';
import {
  TimeSearchModal,
  TimeDisplay,
  TimeConditionGenerator
} from '../TimeSearchModal';
import {
  GeolocationModal,
  GeolocationDisplay,
  GeolocationGenerator
} from '../GeolocationModal';

import SearchBarContainer from './SearchBarContainer';
import { SearchBar } from '.';

// a lot of this information should come from this endpoint
// https://enterprise.stage.veritone.com/api/engine/category?time=1517268957867
// hardcoded for now to help setup storybook.
const transcript = {
  id: '67cd4dd0-2f75-445d-a6f0-2f297d6cd182',
  name: 'Transcript',
  iconClass: 'icon-transcription',
  tooltip: 'Search by Keyword',
  enablePill: true,
  showPill: true
};
const sentiment = {
  id: 'f2554098-f14b-4d81-9be1-41d0f992a22f',
  name: 'Sentiment',
  iconClass: 'icon-sentiment',
  tooltip: 'Search by Sentiment',
  enablePill: true,
  showPill: true
};
const fingerprint = {
  id: '17d62b84-8b49-465b-a6be-fe3ea3bc8f05',
  name: 'Fingerprint',
  iconClass: 'icon-finger_print3',
  tooltip: 'Search by Fingerprint',
  enablePill: true,
  showPill: true
};
const face = {
  id: '6faad6b7-0837-45f9-b161-2f6bf31b7a07',
  name: 'Face',
  iconClass: 'icon-face',
  tooltip: 'Search by Face',
  enablePill: true,
  showPill: true
};
const obj = {
  id: '088a31be-9bd6-4628-a6f0-e4004e362ea0',
  name: 'Object',
  iconClass: 'icon-object_detection',
  tooltip: 'Search by Object',
  enablePill: true,
  showPill: true
};
const recognizedText = {
  id: '3b4ac603-9bfa-49d3-96b3-25ca3b502325',
  name: 'Recognized Text',
  iconClass: 'icon-ocr',
  tooltip: 'Search by Recognized Text',
  enablePill: true,
  showPill: true
};
const logo = {
  id: '5a511c83-2cbd-4f2d-927e-cd03803a8a9c',
  name: 'Logo Recognition',
  iconClass: 'icon-logo-detection',
  tooltip: 'Search by Logo',
  enablePill: true,
  showPill: true
};
const tag = {
  id: 'tag-search-id',
  name: 'Tag Search',
  iconClass: 'icon-tag',
  tooltip: 'Search by Tag',
  enablePill: true,
  showPill: true
};
const structured = {
  id: '72c3ccbb-8c90-48a9-99ee-1c57315b9690',
  name: 'Structured Data',
  iconClass: 'icon-third-party-data',
  tooltip: 'Search by Structured Data',
  enablePill: true,
  showPill: true
};
const time = {
  id: 'time-search-id',
  name: 'Time Search',
  iconClass: 'icon-calendar',
  tooltip: 'Search by Time',
  enablePill: true,
  showPill: true
};
const geolocation = {
  id: '203ad7c2-3dbd-45f9-95a6-855f911563d0',
  name: 'Geolocation',
  iconClass: 'icon-gps',
  tooltip: 'Search by Geolocation',
  enablePill: true,
  showPill: true
}

const appBarColor = '#ff2200';
const enabledEngineCategories = [transcript, face, obj, logo, recognizedText, fingerprint, sentiment, geolocation, tag, structured, time];

const engineCategoryMapping = {
  '67cd4dd0-2f75-445d-a6f0-2f297d6cd182': {
    modal: TranscriptSearchModal,
    getLabel: TranscriptDisplay,
    generateCondition: TranscriptConditionGenerator,
    title: 'Search by Keyword',
    subtitle: 'Search by keyword within our database of transcripts.'
  },
  'f2554098-f14b-4d81-9be1-41d0f992a22f': {
    modal: SentimentSearchModal,
    getLabel: SentimentDisplay,
    generateCondition: SentimentConditionGenerator,
    title: 'Search by Sentiment',
    subtitle: 'Search by positive and negative sentiment in text transcripts.'
  },
  '3b4ac603-9bfa-49d3-96b3-25ca3b502325': {
    modal: RecognizedTextSearchModal,
    getLabel: RecognizedTextDisplay,
    generateCondition: RecognizedTextConditionGenerator,
    title: 'Search by Recognized Text',
    subtitle: 'Searches within our database for recognized text.'
  },
  '6faad6b7-0837-45f9-b161-2f6bf31b7a07': {
    modal: FaceSearchModal,
    getLabel: FaceDisplay,
    generateCondition: FaceConditionGenerator,
    title: 'Search by Face',
    subtitle: 'Search by known images of people within our database.'
  },
  '088a31be-9bd6-4628-a6f0-e4004e362ea0': {
    modal: ObjectSearchModal,
    getLabel: ObjectDisplay,
    generateCondition: ObjectConditionGenerator,
    title: 'Search by Object',
    subtitle: 'Search by objects within our database.'
  },
  '17d62b84-8b49-465b-a6be-fe3ea3bc8f05': {
    modal: FingerprintSearchModal,
    getLabel: FingerprintDisplay,
    generateCondition: FingerprintConditionGenerator,
    title: 'Search by Fingerprint',
    subtitle: 'Locate a certain song or advertisement inside of audio files.'
  },
  '5a511c83-2cbd-4f2d-927e-cd03803a8a9c': {
    modal: LogoSearchModal,
    getLabel: LogoDisplay,
    generateCondition: LogoConditionGenerator,
    title: 'Search by Logo',
    subtitle: 'Search by logos within our database.'
  },
  'tag-search-id': {
    modal: TagSearchModal,
    getLabel: TagDisplay,
    generateCondition: TagConditionGenerator,
    title: 'Search by Tag',
    subtitle: 'Search by tags within our database.'
  },
  '72c3ccbb-8c90-48a9-99ee-1c57315b9690': {
    modal: StructuredDataModal,
    getLabel: StructuredDataDisplay,
    title: 'Search by Structured Data',
    subtitle: 'Search by third party structured data.'
  },
  'time-search-id': {
    modal: TimeSearchModal,
    getLabel: TimeDisplay,
    generateCondition: TimeConditionGenerator,
    title: 'Search by Time',
    subtitle: 'Search by day of week and time within our database.'
  },
  '203ad7c2-3dbd-45f9-95a6-855f911563d0': {
    modal: GeolocationModal,
    getLabel: GeolocationDisplay,
    generateCondition: GeolocationGenerator,
    title: 'Search by Geolocation',
    subtitle: 'Locate by City, ZIP Code or DMA.'
  }
};

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}-${s4()}-${s4()}`;
};

export class SampleSearchBar extends React.Component {
  async componentDidMount() {

    let auth = null;
    let libraries = [];
    let getEntity = null;
    try {
      auth = await this.getAuth();
      getEntity = this.getEntityFetch(auth);
      libraries = await this.getLibraries(auth);
    } catch (e) {
      console.error(e);
    }
    let searchParameters = [];

    //if (this.props.setSearch) this.props.setSearch(this.searchQueryGenerator);
    if(this.props.toCSP) this.props.toCSP( () => this.convertSearchParametersToCSP(this.state.searchParameters));
    if(this.props.csp) {
      searchParameters = this.CSPToSearchParameters(this.props.csp);

      if (getEntity) {
        searchParameters = await Promise.all(searchParameters.map(async searchParameter => {
          if (typeof searchParameter.value === 'object') {
            if (searchParameter.value.type === 'entity') {
              let entity = await getEntity(searchParameter.value.id);
              searchParameter.value.label = entity.name;
              searchParameter.value.image = entity.profileImageUrl;
            } else if (searchParameter.value.type === 'library') {
              let library = libraries.find(library => library.id === searchParameter.value.id);
              if (library) {
                searchParameter.value.label = library.name;
                searchParameter.value.image = library.coverImageUrl;
              }
            }
          }
          return searchParameter;
        }))
      }
    }
    this.setState( { auth: auth, searchParameters: searchParameters, libraries: libraries });
  }

  async getAuth() {
    if (this.props.api) {
      return await fetch(`${this.props.api}v1/admin/current-user`, {
        credentials: 'include'
      })
      .then(
        response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return false;
          }
        }
      )
      .then(y => y.token);
    }
  }

  async getLibraries(auth) {
    if(auth) {
      return await fetch(`${this.props.api}v3/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth
        },
        body: JSON.stringify({query:
          `query {
            libraries {
              records {
                id
                name
                description
                coverImageUrl
              }
            }
          }`
        })
      }).then(
        response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return false;
          }
        }
      ).then( y => y.data.libraries.records )
    }
  }

  getEntityFetch = (auth) => {
    if(auth) {
      return async (entityId) => {
        return await fetch(`${this.props.api}v3/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth
          },
          body: JSON.stringify({query:
            `query {
              entity(id: "${entityId}") {
                id
                name
                profileImageUrl
              }
            }`
          })
        }).then(
          response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return false;
            }
          }
        ).then( y => y.data.entity )
      }
    }
  }

  state = {
    searchParameters: this.props.searchParameters || []
  };

  //Pratt parsing algorithm adapted from https://eli.thegreenplace.net/2010/01/02/top-down-operator-precedence-parsing
  convertSearchParametersToCSP = searchParameters => {
    const operators = {
      'pill': (object) => {
        return {
          nud: () => {
            return object;
          }
        };
      },
      'and': () => {
        return {
          lbp: 20,
          led: (left) => {
            let right = expression(20);
            return resolveGroup('and', left, right);
          }
        };
      },
      'or': () => {
        return {
          lbp: 10,
          led: (left) => {
            let right = expression(10);
            return resolveGroup('or', left, right);
          }
        };
      },
      '(': () => {
        return {
          lbp: 0,
          nud: () => {
            const expr = expression();
            match();
            if(expr['and']) {
              return {
                'and(': expr['and']
              };
            } else if(expr['or']) {
              return {
                'or(': expr['or']
              };
            } else {
              return expr;
            }
          }
        };
      },
      ')': () => {
        return {
          lbp: 0
        };
      },
      'end': () => {
        return {
          lbp: 0
        };
      }
    };

    const resolveGroup = (operator, left, right) => {
      if(!right) {
        return left;
      }
      const leftType = getNodeType(left);
      const rightType = getNodeType(right);
      let resultGroup;
      if(leftType === 'implicitGroup' && rightType === 'pill' && left[operator]) {
        resultGroup = {
          [operator]: [...left[operator], right]
        };
      } else if(leftType === 'pill' && rightType === 'implicitGroup' && right[operator]) {
        resultGroup = {
          [operator]: [left, ...right[operator]]
        };
      } else if(leftType === 'implicitGroup' && rightType === 'implicitGroup' && left[operator] && right[operator]) {
        resultGroup = {
          [operator]: [...left[operator], ...right[operator]]
        };
      } else {
        resultGroup = {
          [operator]: [left, right]
        }
      }
      return resultGroup;
    }

    const getNodeType = (node) => {
      if(!node) {
        return null;
      }
      if(node['and'] || node['or']) {
        return 'implicitGroup';
      } else if(node['and('] || node['or(']) {
        return 'explicitGroup';
      } else {
        return 'pill';
      }
    };

    const match = () => {
      token = getNextToken();
    }

    const expression = (rbp = 0) => {
      let t = token;
      if(!t.nud) {
        return null;
      }
      token = getNextToken();
      let left = t.nud();
      while(rbp < token.lbp) {
        t = token;
        token = getNextToken();
        left = t.led(left);
      }
      return left;
    }

    const getNextToken = () => {
      const nextSearchParameter = tokenIterable.next();
      let token;
      if(nextSearchParameter.done) {
        token = operators['end']();
      } else {
        const type = nextSearchParameter.value.conditionType;
        if(type === 'join' || type === 'group') {
          token = operators[nextSearchParameter.value.value]();
        } else {
          const cspNode = {
            state: nextSearchParameter.value.value,
            engineCategoryId: nextSearchParameter.value.conditionType
          };
          token = operators['pill'](cspNode);
        }
      }
      return token;
    }

    let tokenIterable = searchParameters[Symbol.iterator]();
    let token = getNextToken();
    const csp = expression();
    return csp;
  }

  onSearch = (searchParameters) => {
    if (this.props.onSearch) {
      this.props.onSearch(this.convertSearchParametersToCSP(searchParameters || this.state.searchParameters));
    } else {
      return this.convertSearchParametersToCSP(searchParameters || this.state.searchParameters);
    }
  }

  CSPToSearchParameters = (cognitiveSearchProfile, parentJoinOperator) => {
    //handle case where csp is just a single term without any join groups
    if(cognitiveSearchProfile.state && cognitiveSearchProfile.engineCategoryId) {
      return [
        {
          id: guid(),
          conditionType: cognitiveSearchProfile.engineCategoryId,
          value: cognitiveSearchProfile.state
        }
      ]
    }

    const getJoinOperator = ( query ) => {
      const operators = Object.keys(query);
      return operators[0];
    }

    let searchParameters = [];
    const cspJoinOperator = getJoinOperator(cognitiveSearchProfile);
    const joinOperator = cspJoinOperator.replace('(', '');
    const conditions = cognitiveSearchProfile[cspJoinOperator];
    const shouldAddParens = cspJoinOperator.endsWith('(') || (parentJoinOperator === 'and' && cspJoinOperator === 'or');
    if(shouldAddParens) {
      searchParameters.push({id: guid(), conditionType: 'group', value: '(' });
    }

    for(let i = 0; i < conditions.length; i++) {
      if('engineCategoryId' in conditions[i]) {
        const newSearchPill = { id: guid(), conditionType: conditions[i].engineCategoryId, value: conditions[i].state }
        searchParameters.push( newSearchPill );
      } else {
        const subSearchParameters = this.CSPToSearchParameters(conditions[i], cspJoinOperator);
        searchParameters = [...searchParameters, ...subSearchParameters];
      }
      if(i < conditions.length - 1) {
        searchParameters.push( { id: guid(), conditionType: 'join', value: joinOperator } );
      }
    }
    if(shouldAddParens) {
      searchParameters.push({id: guid(), conditionType: 'group', value: ')' });
    }
    return searchParameters;
  }

  addOrModifySearchParameter = (parameter, index) => {
    const existing = this.state.searchParameters.findIndex(
      searchParameter => searchParameter.id === parameter.id
    );
    // existing parameters are modified
    if (existing !== -1) {
      const newSearchParameters = update(this.state.searchParameters, {
        $splice: [[existing, 1, parameter]]
      });
      this.setState(prevState => ({
        searchParameters: newSearchParameters
      }));

      return newSearchParameters;
    } else if (existing === -1 && typeof(index) === 'number' ) {
      // not existing, index given, insert at a given position
      const newSearchParameter = Array.isArray(parameter) ? parameter.map( x => ({ ...x, id: guid() }) ) : { ...parameter, id: guid() };

      const newSearchParameters = newSearchParameter.length > 1 ? update(this.state.searchParameters, {
        $splice: [[index, 0, ...newSearchParameter]]
      }) : update(this.state.searchParameters, {
        $splice: [[index, 0, newSearchParameter]]
      });

      this.setState(prevState => ({
          searchParameters: newSearchParameters
      }));

      return newSearchParameters;
    } else {
      // add a new parameter
      const newSearchParameter = { ...parameter, id: guid() };
      this.setState(prevState => ({
        searchParameters: [...prevState.searchParameters, newSearchParameter]
      }));

      return [...this.state.searchParameters, newSearchParameter];
    }
  };

  insertMultipleSearchParameters = (parametersToAdd) => {
    const newSearchParameters = parametersToAdd.reduce((latestSearchParameters, {parameter, index}) => {
      const newSearchParameter = {
        ...parameter,
        id: guid()
      };
      return update(latestSearchParameters, {
        $splice: [[index, 0, newSearchParameter]]
      });
    }, this.state.searchParameters);

    this.setState({
      searchParameters: newSearchParameters
    });
    return newSearchParameters;
  }

  removeSearchParameter = id => {
    let filteredOut = [].concat(id);
    this.setState(prevState => ({
      searchParameters: prevState.searchParameters.filter(x => filteredOut.indexOf(x.id) === -1)
    }));

    return this.state.searchParameters.filter(x => filteredOut.indexOf(x.id) === -1);
  };

  resetSearchParameters = () => {
    this.setState({
      searchParameters: []
    })
  };

  extendEngineCategories = engineCategories => {
    const engineCategoriesWithFunctions = engineCategories.map(
      engineCategory => {
        if (engineCategory.id in engineCategoryMapping) {
          return {
            ...engineCategory,
            ...engineCategoryMapping[engineCategory.id]
          };
        }
      }
    );
    return engineCategoriesWithFunctions;
  };

  getTheme = ( { color, relativeSize } ) => {
    const theme = createMuiTheme({
      typography: {
        htmlFontSize: relativeSize || 13,
        subheading: {
          fontSize: "1.2em"
        }
      },
      palette: {
        primary: {
          light: color,
          main: color,
        }
      }
    });
    return theme;
  }

  render() {
    return (
      <MuiThemeProvider theme={ this.getTheme( { color: this.props.color, relativeSize: this.props.relativeSize } ) }>
        <SearchBarContainer
          auth={this.state.auth}
          color={this.props.color}
          enabledEngineCategories={this.extendEngineCategories(
            this.props.enabledEngineCategories ? enabledEngineCategories.filter( engineCategory => engineCategory.id in this.props.enabledEngineCategories) : enabledEngineCategories
          )}
          onSearch={this.onSearch}
          api={this.props.api}
          libraries={this.state.libraries}
          searchParameters={this.state.searchParameters}
          addOrModifySearchParameter={this.addOrModifySearchParameter}
          insertMultipleSearchParameters={this.insertMultipleSearchParameters}
          removeSearchParameter={this.removeSearchParameter}
          resetSearchParameters={this.resetSearchParameters}
        />
      </MuiThemeProvider>
    );
  }
}