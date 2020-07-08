import React from 'react'
import PropTypes from 'prop-types';
import RepoItem from '/RepoItem'

export const repo = ({ repos}) => {
    return  repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
}

Response.propTypes = {
  repo : PropTypes.array.isRequired
};

export default Repos