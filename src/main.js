import DependencyBoss from './Dep/DependencyBoss.js';
const dependencyBoss = new DependencyBoss();

let mainData    = dependencyBoss.getMainObj();

window.libjam = mainData;

console.log("welcome to libjam 0.0.1");
