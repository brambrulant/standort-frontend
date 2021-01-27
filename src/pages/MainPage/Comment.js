export default function Comment({ comments }) {
  const length = comments && comments.length;
  if (!comments || comments.length === 0) return <p>no comments</p>;
  return (
    <p>
      {length} comment:{" "}
      {comments.map((comment, index) => (
        <span key={index}>{comment.text}</span>
      ))}
    </p>
  );
}
