import React from 'react';
import AjaxLoader from 'public/js/components/ajaxloader';
import RestApi from 'public/js/components/restapi';
import Entry from 'public/js/components/entry';
import FeedList from 'public/js/components/feedlist';
import profileData from 'public/js/helper/profiledata';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.lastEntryId = '';
    this.state = {
      entries: [],
      feeds: [],
      profileData: {},
      showLoader: false
    };
  }

  fetchAdditionalEntries() {
    this.setState({showLoader: true});
    RestApi.getDataFromUrl('/entries/more/' + this.lastEntryId,
      (data) => {
        let newData = this.state.entries;
        data.forEach((entry) => {
          newData.push(entry);
        });
        this.lastEntryId = data[data.length-1]._id;
        this.setState({
          entries: newData,
          showLoader: false
        });
    });
  }

  componentWillMount() {
    this.setState({showLoader: true});

    RestApi.getDataFromUrl('/feeds',
      (data) => this.setState({feeds: data}));

    RestApi.getDataFromUrl('/entries',
      (data) => {
        this.setState({
          entries: data,
          showLoader: false,
        })
        this.lastEntryId = data[data.length-1]._id;

      });
  }

  componentDidMount() {
    $(window).on('scroll', () => {
      if( $(window).scrollTop() >= $(document).height() - $(window).height() && $(window).scrollTop() > 100) {
          this.fetchAdditionalEntries();
      }
    }).scroll();
  }

  render() {
    const loader = this.state.showLoader ? <AjaxLoader /> : null;

    return (
      <div className='col-xs-12'>
        <h1>Overview</h1>
        <FeedList feeds={this.state.feeds} />
        {this.state.entries.map(function(entry) {
          const numberOfLikes = entry.likes.length;
          const likedByUser = entry.likes.indexOf(profileData.profile._id) > -1

          return (
            <Entry
              ref={"entry" + entry._id}
              key={new Date(entry.issued).getTime()}
              entryId = {entry._id}
              content={entry.content}
              embed = {entry.embed}
              authorId= {entry.author}
              authorName = {entry.authorName}
              comments = {entry.comments}
              tags = {entry.tags}
              issued = {entry.issued}
              showFeedOrigin = {true}
              feedId = {entry.feed}
              feedTitle = {entry.feedName}
              likes = {numberOfLikes}
              likedByUser = {likedByUser}
            />
          );
        })}
        {loader}
      </div>
    );
  }

}
