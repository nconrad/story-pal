

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

const Home = () =>
  <Root>StoryPal!</Root>

const Root = styled.div`
  margin: 1rem;
`


const NotFound = () =>
  <NotFoundRoot>URL not found!</NotFoundRoot>

const NotFoundRoot = styled(Root)



const StoryIndex = () => {
  const history = useHistory();

  const nav = (path) => {
    history.push(path);
  }

  return (
    <>
    {
      Object.keys(config).map((filePrefix, i) =>
        <TreeItem nodeId={filePrefix} label={filePrefix} key={i}>
          {
            Object.keys(config[filePrefix]).map((storyName, j) => {
              const path = `/${filePrefix}/${storyName}`

              return (
                <TreeItem
                  onClick={() => nav(path)}
                  label={storyName}
                  key={path}
                  nodeId={path}
                />
              )
            })
          }
        </TreeItem>
      )
    }
    </>
  )
}


const StoryRoutes = () => {
  const getRoute = ({storyName, filePrefix, story}) => (
    <Route
      path={`/${filePrefix}/${storyName}`} exact
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
            <StoryIndex />
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

render(<App />, document.getElementById('app'));
