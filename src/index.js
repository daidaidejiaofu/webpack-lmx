// 引入loadsh 
import _ from 'lodash';
import "./index.css";
function createDomElement() {
    var dom = document.createElement('div');
    dom.innerHTML = _.join(['你好3333', 'webpack'], '');
    dom.classList.add('hello')
    return dom;
}
document.body.appendChild(createDomElement());
