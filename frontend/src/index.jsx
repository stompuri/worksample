/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getProjectsFromApi = async () => {
  try {
    const uri = `${baseURL}/projects`;
    const response = await fetch(uri);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

const deleteProjectViaApi = async (id) => {
  try {
    const uri = `${baseURL}/projects/${id}`;
    const params = {
      method: 'DELETE'
    };
    const response = await fetch(uri, params);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

const addProjectViaApi = async (data) => {
  try {
    const uri = `${baseURL}/projects`;
    const params = {
      body: data,
      headers: {
        'content-type': 'text/plain'
      },
      method: 'POST'
    };
    const response = await fetch(uri, params);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class ProjectList extends React.Component {
  renderItem(item, i) {
    if(item.name && item.name.length > 0) {
      return (
        <p key={item.id}>
          {item.id}. {item.name}
        </p>
      )
    }
  }

  render() {
    if(this) {
      var projects = this.props.projects;
      projects = Object.keys(projects).map(function(k) { return projects[k] });
      return (
        <div>
          { projects && projects.map(this.renderItem) }
        </div>
      )
    }
  }
}

class DeleteProjectForm extends React.Component {
  removeProject(e) {
    e.preventDefault();
    const id = this.refs.deleteId.value;
    //call the deleteProject method from the App component if we have a value
    if (id) {
      this.props.deleteProject(id);
      //reset the form
      this.refs.deleteForm.reset();
    }
  }

  render() {
   return(
     <form ref="deleteForm" onSubmit={this.removeProject.bind(this)}>
     <div>
       <label htmlFor="itemToDelete">Delete project by number</label>
       <input type="text" id="itemToDelete" placeholder="number" ref="deleteId"/>
     </div>
     <button type="submit">Delete Project</button>
    </form>
   )
  }
}

class AddProjectForm extends React.Component {
  createProject(e) {
    e.preventDefault();
    const project = this.refs.projectName.value;
    //call the addProject method from the App component if we have a value
    if (typeof project === 'string' && project.length > 0) {
      this.props.addProject(project);
      //reset the form
      this.refs.projectForm.reset();
    }
  }

  render() {
   return(
     <form ref="projectForm" onSubmit={this.createProject.bind(this)}>
     <div>
       <label htmlFor="projectItem">Project Name</label>
       <input type="text" id="ProjectItem" placeholder="name" ref="projectName"/>
     </div>
     <button type="submit">Add Project</button>
    </form>
   )
  }
}

class Worksample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: {},
    };
  }

  async componentWillMount() {
    const response = await getProjectsFromApi();
    const projects = response ? response : {};
    this.setState({ projects: projects });
  }

  async deleteProject(id) {
    const response = await deleteProjectViaApi(id);
    this.componentWillMount();
  }

  async addProject(name) {
    // todo: type is now always undefined
    var project = { "name": name, "type": "undefined" };
    const response = await addProjectViaApi(project);
    project.id = response.id;
    // Append the added item to this.state.projects
    this.setState({ projects: [...this.state.projects, project] });
  }

  render() {
    const { projects } = this.state;
    return (
      <div className="container">
        <h2>Simple project list (show all, add, delete)</h2>
        <ProjectList projects={projects} />
        <AddProjectForm addProject={this.addProject.bind(this)} />
        <br />
        <DeleteProjectForm deleteProject={this.deleteProject.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Worksample />,
  document.getElementById('app')
);
