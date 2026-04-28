
function Footer() {
    return (
            <footer id="contact" className="bg-dark text-light py-4 mt-auto">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                        <strong>LiveScoreBoard</strong>
                        <div className="small">© {new Date().getFullYear()} LiveScoreBoard, Inc. All rights reserved.</div>
                    </div>
                    <div className="mt-2 mt-md-0">
                        <a className="text-light me-3" href="#!">Privacy</a>
                        <a className="text-light me-3" href="#!">Terms</a>
                        <a className="text-light" href="#!">Support</a>
                    </div>
                </div>
            </footer>
    )
}

export default Footer