# Songwritify
### A safe place for your music projects.

Songwritify is a simple and safe web app for Artists available on most platforms, including Web, Mac, Windows, Linux, iOS, and Android. It focuses on simplicity.

![homePage](app/assets/images/home_page.png)

### Why Songwritify?

- Simple and easy to use
- Secure log in or sign up
- Free sync on unlimited devices
- Organize all your notes
- Markdown built-in to style your text
- Every change is tracked
- Automatically saves, without having to press any button
- Find your notes with our modern search
- Multiple tags on notes
- Open Source

<img src="https://github.com/tseleski/JustNote/blob/master/app/assets/images/sign_up.png" width="60%">

> To make dropdown menus (like the "remove tag" one above) disappear on a click outside of the component, I used the following code:

```javascript

togglePopup(e) {
    e.stopPropagation();
    this.setState({ deletePopup: !this.state.deletePopup });
  }

  closePopup() {
    this.setState({ deletePopup: false });
  }

  //..

  render(){
    const popup = this.state.deletePopup ? "show" : "hide";
    return (
      <div className="tag-form-list-item" onClick={this.togglePopup} onBlur={this.closePopup} tabIndex="0">
        <div className="tag-relative">
          <div className="tag-name">{this.props.tag.name}
            <div className="caret-container">
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
      // Additional component rendering
    )
  }

  ```

## Technologies Used

* Ruby on Rails
* PostgreSQL
* React.js and Redux
* Javascript (ES6)
* HTML and CSS

### Future Features

* Shortcuts to specific notes
* Users will be able to move notes to the trash. From the trash, users can choose to either restore a note or permanently delete it