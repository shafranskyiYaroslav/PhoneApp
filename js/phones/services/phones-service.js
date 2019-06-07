const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const PhonesService = {
  async getAll({query = '', order = ''} = {}) {
    let result;
    try {
      const response = await window.fetch(API_URL + '/phones.json');
      result = await response.json();
    } catch (error) {
        result = [];
    }
    const filteredResult = result.filter((phone) => {
      return phone.name.toLowerCase().includes(query.toLowerCase());    
      });
      switch (order) {
        case 'age':
          filteredResult.sort((a,b) => a.age - b.age);
          break;
        case 'name':
          filteredResult.sort((a,b) => a.name.localeCompare(b.name));
      }
      return filteredResult;
  },
  
  getById(id) {
    return window.fetch(API_URL + '/phones/' + id + '.json')
    .then((response) => response.json());
  },
};

export default PhonesService;
