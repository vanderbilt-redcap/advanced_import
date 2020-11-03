<?php namespace Vanderbilt\AdvancedImport; ?>
<link rel="stylesheet" href="<?= $module->getUrl('./assets/css/style.css'); ?>">
<script>
(function(window, document){
    var resize_observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const content_rect = entry.contentRect
            // console.log('Element:', entry.target)
            // console.log(`Element size: ${content_rect.width}px x ${content_rect.height}px`)
            // console.log(`Element padding: ${content_rect.top}px ; ${content_rect.left}px`)
            onNavbarResized(content_rect)
        }
    })
    var onNavbarResized = function(content_rect) {
        var pagecontent_element = document.querySelector('#pagecontent')
        if(!pagecontent_element) return
        var padding = content_rect.height
        pagecontent_element.style.paddingTop = padding+'px'
    }
    
    document.addEventListener('DOMContentLoaded', function(event){
        var navbar_element = document.querySelector('#pagecontent > nav.navbar')
        if(!navbar_element) return
        console.log(navbar_element)
        resize_observer.observe(navbar_element)
    })
}(window, document))
</script>