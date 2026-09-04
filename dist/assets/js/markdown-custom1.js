window.formatBotMessage = function (text) {
    if (!text) return '';
    var withRealNewlines = text.replace(/\\n/g, '\n');
    if (typeof marked !== 'undefined' && marked.parse) {
        var renderer = new marked.Renderer();
        var defaultLinkRenderer = renderer.link.bind(renderer);
        renderer.link = function (href, title, linkText) {
            var html = defaultLinkRenderer(href, title, linkText);
            return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
        };
        return marked.parse(withRealNewlines, { renderer: renderer });
    }
    // Fallback: escape HTML, convert newlines to <br>, and make URLs clickable
    var div = document.createElement('div');
    div.textContent = withRealNewlines;
    var escaped = div.innerHTML;
    escaped = escaped.replace(/\n/g, '<br>');
    escaped = escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    return escaped;
};

//document.addEventListener("DOMContentLoaded", function () {
//    if (typeof markdownContent === 'undefined') return;
//    Object.keys(markdownContent).forEach(key => {
//        const el = document.getElementById(key);

//        if (el && (!markdownContent[key] || markdownContent[key].trim() === "")) {
//            el.remove();
//            return;
//        }

//        if (!el) return;

//        el.innerHTML = window.formatBotMessage(markdownContent[key]);
//    });
//});