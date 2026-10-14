
import { useState } from 'react';

function MenuItem({ node, onSelect }) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            setExpanded(!expanded);
        }

        onSelect(node);
    };

    return (
        <li>
            <button
                className="menu-button"
                onClick={handleClick}
            >
                <span>{node.title}</span>
                {hasChildren && (
                    <span>{expanded ? '−' : '+'}</span>
                )}
            </button>

            {hasChildren && expanded && (
                <ul className="submenu">
                    {node.children.map((child) => (
                        <MenuItem
                            key={child.link}
                            node={child}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

function Sidebar({ tree, onSelect }) {
    if (!tree.root) {
        return null;
    }

    return (
        <aside className="sidebar">
            <h2>Mi aplicación</h2>

            <ul className="menu-list">
                <MenuItem
                    node={tree.root}
                    onSelect={onSelect}
                />
            </ul>
        </aside>
    );
}

export default Sidebar;
