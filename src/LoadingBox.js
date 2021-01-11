import Spinner from './icons/Spinner'
function LoadingBox(props) {
    return (
        <div className="Loading-Box">
            <table>
                <tbody>
                    { props.links.map(function(link){
                        return (
                            <tr key={ link.id }>
                                <td>{link.url}</td>
                                <td>{link.loading && <Spinner></Spinner>}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LoadingBox