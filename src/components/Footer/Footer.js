import './Footer.scss';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span>&copy; FinalExam</span>
      <span>{year}</span>
    </footer>
  );
}

export default Footer;
