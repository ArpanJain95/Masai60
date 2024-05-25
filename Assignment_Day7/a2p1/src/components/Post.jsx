function Post({ title, body, name, color, pantone_value, year }) {
  return (
    <div style={{border: `${color} 2px solid`, margin: "10px"}}>
      {/* <p>Title : {title}</p>
      <p>Body : {body}</p> */}
      <p>Name: {name}</p>
      <p>Year: {year}</p>
      <p>Pantone Value: {pantone_value}</p>
    </div>
  );
}

export default Post;
