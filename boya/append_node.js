
function find_node (node) {
        if(node.match("/tag/")){

            return document.getElementsByTagName(node.slice(3))
        }

        if(node.match("/id/")){
            return document.getElementById(node.slice(2))
        }

        if(node.match("/class/")){
            return document.getElementsByClassName(node.slice(5))
        }else {
            return document.getElementsByName(node);
        }

}