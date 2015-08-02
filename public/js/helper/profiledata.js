import RestApi from 'public/js/components/restapi';

class ProfileData {
  constructor() {
    this.profile = {};
  }

  fetchData(callback) {
    RestApi.getDataFromUrl('/credentials',
      (data) => {
        this.profile = data;
        if(callback) {
          callback()
        }
      });
  }
}

const profileData = new ProfileData();

export default profileData;
