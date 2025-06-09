import PropTypes from "prop-types"

function Paragraph({sentence}) {
  return (
    <p dangerouslySetInnerHTML={{__html:sentence}}/>
  )
}

Paragraph.propTypes = {
  sentence: PropTypes.string
}

export default Paragraph