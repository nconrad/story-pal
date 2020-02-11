

import React, {lazy, Suspense} from 'react'
import { BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'
import { render } from 'react-dom'
import styled from 'styled-components'

import NavBar from './components/NavBar'
import Tree from './components/tree/Tree'
import TreeItem from './components/tree/TreeItem'

import './static/styles.scss'
import 'material-design-icons/iconfont/material-icons.css'

import getConfig from './config'

const config = getConfig()

const Page = styled.div`
  display: flex;
  height: 100%;
`

const SideBar = styled.div`
  height: 100%;
  width: 200px;
  margin-top: 50px;
  border-right: 2px solid #f2f2f2;

`
const Content = styled.div`
  margin-top: 50px;
`


const Home = () =>
  <div>Story Pack!</div>


const NotFound = () =>
  <div>URL not found!</div>


const StoryIndex = () => {
  const history = useHistory();

  const nav = (path) => {
    history.push(path);
  }

  const item = ({filePrefix, storyName, idx}) => (
    <TreeItem
      onClick={() => nav(storyName)}
      nodeId={filePrefix + storyName}
      key={idx}
      label={storyName}
    />
  )

  return (
    <>
    {
      Object.keys(config).map((filePrefix, i) => {
        return (
          <TreeItem nodeId={filePrefix} label={filePrefix} key={i}>
            {
              Object.keys(config[filePrefix]).map((storyName, j) =>
                item({filePrefix, storyName, idx: j})
              )
            }
          </TreeItem>
        )
      })
    }
    </>
  )
}

const StoryRoutes = () => {
  const getRoute = ({storyName, filePrefix, story}) => (
    <Route
      path={`/${storyName}`} exact
      component={story}
      key={filePrefix + storyName}
    />
  )

  return (
    <>
      {
        Object.keys(config).map(filePrefix => {
          return Object.keys(config[filePrefix]).map(storyName => {
            const story = config[filePrefix][storyName]
            return getRoute({story, storyName, filePrefix})
          })
        })
      }
    </>
  )
}

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />

      <Page>
        <SideBar>
          <Tree>
            <TreeItem label="button">
              <TreeItem label="ButtonExample" />
            </TreeItem>
            <TreeItem label="forms">
              <TreeItem label="demoTwo" />
            </TreeItem>
          </Tree>
        </SideBar>

        <Content>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <StoryRoutes />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </Content>
      </Page>

    </BrowserRouter>
  )
};

render(<App />, document.getElementById('app'));
