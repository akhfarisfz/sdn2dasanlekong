import PropTypes from "prop-types";

const ComponentMessageValidation = ({ messages }) => {
  return (
    <>
      {messages?.map((message, index) => (
        <small key={index} className={"block text-red-500"}>
          {message}
        </small>
      ))}
    </>
  )
}

ComponentMessageValidation.propTypes = {
  messages: PropTypes.array
}

export default ComponentMessageValidation;