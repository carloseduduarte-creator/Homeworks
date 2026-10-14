
import Tree from 'react-d3-tree';

function BinaryTreeView({ data }) {
    return (
        <div
            style={{
                width: '100%',
                height: '500px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                background: '#fff'
            }}
        >
            <Tree
                data={data}
                orientation="vertical"
                translate={{ x: 400, y: 70 }}
                pathFunc="step"
                zoomable={true}
                collapsible={false}
            />
        </div>
    );
}

export default BinaryTreeView;
