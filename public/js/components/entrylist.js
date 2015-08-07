import React from 'react';

import AjaxLoader from 'public/js/components/ajaxloader';
import Entry from 'public/js/components/entry';

import profileData from 'public/js/helper/profiledata';
import RestApi from 'public/js/components/restapi';

export default class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.lastEntryId = '';
    this.state = {
      entries: [],
      showLoader: false
    };
  }

  fetchAdditionalEntries() {
    this.setState({showLoader: true});
    RestApi.getDataFromUrl(this.props.restEndpoint + '/more/' + this.lastEntryId,
      (data) => {
        if (data.length < 1) {
          this.setState({showLoader:false});
          return;
        }

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

  onScroll() {
    if( $(window).scrollTop() >= $(document).height() - $(window).height() && $(window).scrollTop() > 100) {
        if(!this.state.showLoader) {
          this.fetchAdditionalEntries();
        }
    }
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  componentDidMount() {
    this.setState({showLoader: true});

    RestApi.getDataFromUrl(this.props.restEndpoint,
      (data) => {
        this.setState({
          entries: data,
          showLoader: false,
        })
        this.lastEntryId = data[data.length-1]._id;

    });

    $(window).on('scroll', this.onScroll.bind(this));

  }

  render() {
    const loader = this.state.showLoader ? <AjaxLoader /> : null;
    return (
      <div>
        {this.state.entries.map((entry) => {
          const numberOfLikes = entry.likes.length;
          const likedByUser = entry.likes.indexOf(profileData.profile._id) > -1

          return (
            <Entry
              ref={"entry" + entry._id}
              key={entry._id}
              entryId = {entry._id}
              content={entry.content}
              embed = {entry.embed}
              authorId= {entry.author}
              authorName = {entry.authorName}
              comments = {entry.comments}
              tags = {entry.tags}
              issued = {entry.issued}
              showFeedOrigin = {this.props.showFeedOrigin}
              feedId = {entry.feed}
              feedTitle = {entry.feedName}
              likes = {numberOfLikes}
              likedByUser = {likedByUser}
            />
          );
        })}
        {loader}
      </div>
    )

  }
}

EntryList.propTypes = {
  restEndpoint: React.PropTypes.string,
  showFeedOrigin: React.PropTypes.bool
}

EntryList.defaultProps = {
  restEndpoint: '/entries',
  showFeedOrigin: true
}
