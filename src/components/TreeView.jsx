
function TreeView({ node }) {
  const isFolder = node.type === "folder";

  return (
    <div className="tree-node">
      <div className="tree-item">
        <span className="tree-icon">
          {isFolder ? "📁" : "📄"}
        </span>

        <span>{node.name}</span>
      </div>

      {node.children.map((child, index) => (
        <TreeView key={index} node={child} />
      ))}
    </div>
  );
}

export default TreeView;
