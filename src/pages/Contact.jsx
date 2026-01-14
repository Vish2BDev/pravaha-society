import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import './PageStyles.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="page contact">


            {/* Split Layout */}
            <section className="contact__main">
                <div className="contact__image">
                    <img
                        src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=1600&fit=crop"
                        alt="Dance performance"
                    />
                    <div className="contact__image-overlay" />
                </div>

                <div className="contact__content">
                    {submitted ? (
                        <div className="contact__success">
                            <div className="contact__success-icon">
                                <Check size={32} />
                            </div>
                            <h3>Message Sent</h3>
                            <p>Thank you for reaching out. We'll get back to you soon.</p>
                            <button onClick={() => setSubmitted(false)} className="contact__success-btn">
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <h2>Send a Message</h2>

                            <div className="contact__form-row">
                                <div className="contact__field">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact__field">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="join">Join Pravaha</option>
                                    <option value="event">Event Inquiry</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="contact__field">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message..."
                                    rows={5}
                                    required
                                />
                            </div>

                            <button type="submit" className="contact__submit">
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </section >
        </div >
    )
}

export default Contact
