const List = (props) => {
    return (
      <>
        {props.isLoading && <p>로딩중</p>}
        {props.error && <p>{props.error}</p>}
        <ul>
          {props.posts.map((post) => (
            <li key={post.id}>{`${post.text} (${post.id})`}</li>
          ))}
        </ul>
      </>
    );
  };
  
  export default List;