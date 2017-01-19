<!DOCTYPE html>
<html>
    <head>
        <title>lzb_test</title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <!--<meta content="width=device-width; initial-scale=.4;" name="viewport"/>-->
        <link href="css/civilian/stylesheet.css" rel="stylesheet" type="text/css"/>
        <link href="css/typemedia.css" rel="stylesheet" type="text/css"/>

        <script src="js/jquery-1.4.4.min.js" type="text/javascript"></script>
        <script src="js/jquery.touchSwipe-1.2.4.js" type="text/javascript"></script>
        <script src="js/ynlib.js" type="text/javascript"></script>
        <script type="text/javascript">

            currentStudent = '';
            lastStudent = '';
            windowState = 'minimized';
            isOpen = false;

            posterwidth = 500;
            contentwidth = 900;
            otherwidths = 1800;
            finderwidth = 200;
            fixedfinderwidth = 50;
            pagetitle = 'lalala';
//


            function contentScrollDown(shortname, position) {
                $('#content_' + shortname).animate({scrollTop: 500}, 500);
                $('#showings_navigation_scroll_' + shortname + '_up').css('display', 'block');
                $('#showings_navigation_scroll_' + shortname + '_down').css('display', 'none');
            }

            function contentScrollUp(shortname, position) {
                $('#content_' + shortname).animate({scrollTop: 0}, 500);
                $('#showings_navigation_scroll_' + shortname + '_up').css('display', 'none');
                $('#showings_navigation_scroll_' + shortname + '_down').css('display', 'block');
            }


            function openStudent(shortname) {
                if (isOpen) {
                    if (shortname == currentStudent) {
                        hideStudent(shortname);
                        scrollToStudent(shortname);
                    }
                    else {
                        hideStudent(currentStudent);
                        showStudent(shortname);
                    }
                } else {
                    showStudent(shortname);
                }


            }

            function replaceURL(url) {

                if (history.pushState instanceof Function) {
                    var stateObj = {foo: "bar"};
                    //lzb 
                    //history.pushState(stateObj, "page 2", url);
                }

            }

            function showStudent(student) {
                // add CSS
                $('#fixedfinder_item_' + student).addClass(student + ' finder_item_cosen');
                $('#finder_item_' + student).addClass(student + ' finder_item_cosen');
                $('#showings_navigation_scroll_' + student + '_up').css('display', 'none');
                $('#showings_navigation_scroll_' + student + '_down').css('display', 'block');


                // set page title
                console.log(pagetitle + ' - ' + students[student]['longname']);
                $('title').text(pagetitle + ' - ' + students[student]['longname']);
                //lzb
                // replace URL 
                //replaceURL("http://typemedia2011.com/" + student);

                // apply content html
                div = $('#content_' + student).children('.content_inner');
                if (!div.html()) {
                    div.html(students[student]['content']);
                }

                showContent('#content_' + student);
                currentStudent = student;
                scrollToStudent(student);
            }

            function showContent(id) {
                // change body width
//		$('html,body').css('width', 12 * posterwidth + contentwidth + otherwidths);
//		$('html,body').css('width', $('html,body').css('width') + contentwidth);


                // show content div, fade in content
                $(id).show(500, function() {
                    $(this).children(".content_inner").fadeIn(100);
                    scrolling();
                });
                isOpen = true;
                recalculatePageWidth();
            }

            function hideStudent(student) {

                // remove CSS
                $('#fixedfinder_item_' + student).removeClass(student + ' finder_item_cosen');
                $('#finder_item_' + student).removeClass(student + ' finder_item_cosen');

                // set page title
                $('title').text(pagetitle);

                // replace URL
                //lzb
                //replaceURL("http://typemedia2011.com/");

                hideContent('#content_' + student);
                currentStudent = '';
                lastStudent = student;
            }

            function hideContent(id) {
                $(id).children(".content_inner").fadeOut(100, function() {
                    $(id).hide(500, function() {
                        recalculatePageWidth();
                    });
                });
                isOpen = false;

            }

            function recalculatePageWidth() {
                if (isOpen) {
                    $('html,body').css('width', 12 * posterwidth + contentwidth + otherwidths);
                }
                else {
                    $('html,body').css('width', 12 * posterwidth + otherwidths);
//			$('html,body').animate({'width': 12 * posterwidth + otherwidths}, 200);
                }
            }

            function scrollToStudent(shortname) {

                if (isTouchDevice()) {
                    $('#fixedfinder').hide();
                }

                // scroll to left of poster
                if ($(window).width() > (posterwidth + contentwidth)) {
                    position = finderwidth + students[shortname]['index'] * posterwidth;
                }
                // scroll to right of content
                else {
                    position = finderwidth + posterwidth + students[shortname]['index'] * posterwidth + contentwidth - $(window).width() + 300 - $(window).width() * .2;
                }

                if (lastStudent) {
                    time = 450 + (Math.abs(students[shortname]['index'] - students[lastStudent]['index'])) * 500 / 6;
                }
                else {
                    time = 500;
                }
                $('html,body').animate({scrollLeft: position}, time, function() {
                    scrolling()
                });

            }

            function changeShowing(shortname, increment) {
                array = students[shortname]['showings'];
                i = students[shortname]['currentshowing'];

                // next
                if (increment > 0) {
                    if (i + increment < array.length) {
                        newi = i + increment;
                    }
                    else {
                        newi = 0;
                    }
                }
                // previous
                else if (increment < 0) {
                    if (i + increment < 0) {
                        newi = array.length - 1;
                    }
                    else {
                        newi = i + increment;
                    }
                }

                // apply
                $('#showings_' + shortname).html(array[newi]);
                students[shortname]['currentshowing'] = newi;

                $('#showings_navigation_counter_' + shortname).html((newi + 1) + ' of ' + array.length);




            }

            function changeShowing_old(shortname, increment) {
                array = students[shortname]['showings'];
                current = $('#showings_' + shortname).html();
                i = array.index(current);

                // next
                if (increment > 0) {
                    if (i + increment < array.length) {
                        newi = i + increment;
                    }
                    else {
                        newi = 0;
                    }
                }
                // previous
                else if (increment < 0) {
                    if (i + increment < 0) {
                        newi = array.length - 1;
                    }
                    else {
                        newi = i + increment;
                    }
                }

                // apply
                $('#showings_' + shortname).html(array[newi]);

                $('#showings_navigation_counter_' + shortname).html((newi + 1) + ' of ' + array.length);




            }

            $(window).scroll(function() {
                scrolling();
            });

            function scrolling() {

                if (isTouchDevice()) {
                    $('#fixedfinder').css('left', $(window).scrollLeft());

                }

                if ($(window).scrollLeft() > finderwidth - fixedfinderwidth) {
                    $('#fixedfinder').show();
                }
                else {
                    $('#fixedfinder').hide();
                }
            }



            // swiping

            var swipeOptions =
                    {
                        swipeStatus: swipeStatus,
                        threshold: 0,
                        allowPageScroll: 'auto'
                    }
            $(function()
            {
                //Enable swiping...
                $('html').swipe(swipeOptions);

            });
            function swipeStatus(event, phase, direction, distance)
            {
                if (phase == 'move' && distance > 5) {
                    $('#fixedfinder').hide();
                }
            }

            function isTouchDevice() {
                var el = document.createElement('div');
                el.setAttribute('ongesturestart', 'return;');
                if (typeof el.ongesturestart == "function") {
                    return true;
                } else {
                    return false
                }
            }



            function Maximize() {

                if (windowState == 'minimized') {
                    console.log('maximize');
                    savedleft = self.screenX;
                    savedtop = self.screenY;
                    console.log(savedleft + ' ' + savedtop);
                    savedwidth = self.outerWidth;
                    savedheight = self.outerHeight;
                    self.moveTo(0, 0);
                    self.resizeTo(screen.availWidth, screen.availHeight);
                    windowState = 'maximized';
                    $('#maximize_button').attr('src', 'img/pix/minimize.png');
                }
                else if (windowState == 'maximized') {
                    console.log(savedleft + ' ' + savedtop);
                    console.log('minimize');
                    self.moveTo(savedleft, savedtop);
                    self.moveTo(100, 100);
                    self.resizeTo(savedwidth, savedheight);
                    windowState = 'minimized';
                    $('#maximize_button').attr('src', 'img/pix/maximize.png');
                }


                return true;
            }

            function Maximize2() {
                self.moveTo(0, 0);
                self.resizeTo(screen.availWidth, screen.availHeight);
                return true;
            }


            $(window).keydown(function(event) {
                // right
                if (event.which == '39') {

                    if (currentStudent == '') {
                        if (lastStudent) {
                            index = studentshortnames.index(lastStudent) + 1;
                            if (index > studentshortnames.length - 1) {
                                index = 0;
                            }
                            openStudent(studentshortnames[index]);
                        }
                        else {
                            openStudent(studentshortnames[0]);
                        }
                    }
                    else {
                        index = studentshortnames.index(currentStudent) + 1;
                        if (index > studentshortnames.length - 1) {
                            index = 0;
                        }
                        openStudent(studentshortnames[index]);
                    }

                    event.preventDefault();
                }
                // left
                else if (event.which == '37') {
                    if (currentStudent == '') {
                        if (lastStudent) {
                            index = studentshortnames.index(lastStudent) - 1;
                            if (index < 0) {
                                index = studentshortnames.length - 1;
                            }
                            openStudent(studentshortnames[index]);
                        }
                        else {
                            openStudent(studentshortnames[studentshortnames.length - 1]);
                        }
                    }
                    else {
                        index = studentshortnames.index(currentStudent) - 1;
                        if (index < 0) {
                            index = studentshortnames.length - 1;
                        }
                        openStudent(studentshortnames[index]);
                    }

                    event.preventDefault();
                }


                else {

                    // All other characters
                    char = String.fromCharCode(event.keyCode);

                    for (var i = 0; i < studentshortnames.length; i++) {
                        s = students[studentshortnames[i]];
                        if (s['longname'].substr(0, 1) == char) {
                            newStudent = studentshortnames[i];

                            if (newStudent != currentStudent) {
                                openStudent(newStudent);
                                break;
                            }
                        }
                    }
                }
            });


            // Google Tracker
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-4054705-5']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                ga.src = 'js/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();


            var students = Array();
            var studentshortnames = Array();
            studentshortnames.push('sun');
            students['sun'] = Array();
            students['sun']['index'] = 0;
            students['sun']['longname'] = 'Sun Jung Hwang';
            students['sun']['content'] = '<div id="showings_sun" class="showings"><img class="showing" src="img/showings/01_showing_sun.png" width="900" height="560" /></div><div class="clear"><div id="showings_navigation_sun" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'sun\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'sun\', 1);">&rarr;</a></div><div id="showings_navigation_counter_sun" class="showings_navigation_buttons">1 of 8</div><div id="showings_navigation_scroll_sun_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'sun\');">&darr; Information</a></div><div id="showings_navigation_scroll_sun_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'sun\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Superhero</div>My aim is to explore and experiment different characteristics of the typeface. It is a way of looking at display versus text, or even various degrees of display.<br>The type family is purely in the display realm, with various superpowers for each of the weights.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Sun Jung Hwang</div><div class="content_descriptions_text">Sun Jung is a graphic designer originally from South Korea. She graduated BA in graphic design at the <em>Royal Academy of Arts</em> (KABK), Den Haag, in 2006. Before coming back to KABK for her study, she has worked in the fields of advertising and graphic design. Sun is fascinated by complex things in life. Complex layers and colors are her best friend.</div><div class="content_descriptions_text"><em>Sun on the web: </em><a href="http://www.sunsunsun.nl" target="_blank">http://www.sunsunsun.nl</a></div></div></div>';
            students['sun']['currentshowing'] = 0;
            studentshortnames.push('malte');
            students['malte'] = Array();
            students['malte']['index'] = 1;
            students['malte']['longname'] = 'Malte Herok';
            students['malte']['content'] = '<div id="showings_malte" class="showings"><img class="showing" src="img/showings/00_Cassise.jpg" width="900" height="560" /></div><div class="clear"><div id="showings_navigation_malte" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'malte\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'malte\', 1);">&rarr;</a></div><div id="showings_navigation_counter_malte" class="showings_navigation_buttons">1 of 11</div><div id="showings_navigation_scroll_malte_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'malte\');">&darr; Information</a></div><div id="showings_navigation_scroll_malte_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'malte\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Cassise</div>Cassise is a contemporary interpretation of the diversification of type design styles that took place during the early 19th century. Intended to be used in magazine typography, Cassise combines three different approaches&mdash;from Modern over Egyptian to Grotesque styles&mdash;all based on a similar skeleton to form one unified typeface family. Each style comes in two weights, Regular and Black. The emphasis on its quirky letterforms gives any layout a friendly and jolly appearance.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Malte Herok</div><div class="content_descriptions_text">Malte&rsquo;s interest in type design was sparked during his studies of Communication Design at the <em>HTW Berlin</em> from where he graduated in 2010 with a research thesis on typeface revivalism. Along the way, he gathered different views and influences spending several semesters as a (visiting) student in the type design classes of <em>J&uuml;rgen Huber</em>, <em>Luc[as] de Groot</em> and <em>Fred Smeijers</em>. Since 2007, Malte is working as a freelance graphic designer in his hometown Berlin.</div><div class="content_descriptions_text"><em>Malte on the web: </em><a href="#" target="_blank">http://mlthrk.com</a></div><div class="content_descriptions_text"><em>Malte on Twitter: </em><a href="#" target="_blank">@mlthrk</a></div></div></div>';
            students['malte']['currentshowing'] = 0;
            studentshortnames.push('yanone');
            students['yanone'] = Array();
            students['yanone']['index'] = 2;
            students['yanone']['longname'] = 'Yanone';
            students['yanone']['content'] = '<div id="showings_yanone" class="showings"><iframe src="video" width="900" height="560" frameborder="0"></iframe></div><div class="clear"><div id="showings_navigation_yanone" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'yanone\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'yanone\', 1);">&rarr;</a></div><div id="showings_navigation_counter_yanone" class="showings_navigation_buttons">1 of 15</div><div id="showings_navigation_scroll_yanone_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'yanone\');">&darr; Information</a></div><div id="showings_navigation_scroll_yanone_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'yanone\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Antithesis</div>Make the type bigger.<br>Not 7, 14, 22. Not 84, not 144. Push the limit, reduce to the maximum. A Slab Serif, a connected script and a heavy Sans. Three styles to fit them all. Distant humanist relatives, yet a family.<br>Tune up your circuits, check out your chips. Colors of light, pulses of sound. All goes to one. Listen to the white noise in your ears. Strobe, laser, beams.<br>Interpolation is so &rsquo;90s.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Yanone</div><div class="content_descriptions_text">Born in Dresden, Germany, and grown up in Addis Ababa, Ethiopia. Yanone started to design type in his first university years at the <em>Bauhaus-University in Weimar</em>, leading to the release of his first typeface <em>Kaffeesatz</em> in 2004. Internships took him to <em>SYNTAX</em> in Amman, Jordan and <em>FontShop International</em> in Berlin and he finished university with his Arabic/Latin typeface <em>Amman</em> for the rebranding of Jordan&rsquo;s capital which was released in 2009 by the <em>FontFont</em> library.</div><div class="content_descriptions_text"><em>Yanone on the web: </em><a href="#" target="_blank">http://yanone.de</a></div><div class="content_descriptions_text"><em>Yanone on Twitter: </em><a href="#" target="_blank">@yanone</a></div></div></div>';
            students['yanone']['currentshowing'] = 0;
            studentshortnames.push('florian');
            students['florian'] = Array();
            students['florian']['index'] = 3;
            students['florian']['longname'] = 'Florian Schick';
            students['florian']['content'] = '<div id="showings_florian" class="showings"><iframe src="img/svgz/florian_schick_01.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_florian" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'florian\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'florian\', 1);">&rarr;</a></div><div id="showings_navigation_counter_florian" class="showings_navigation_buttons">1 of 13</div><div id="showings_navigation_scroll_florian_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'florian\');">&darr; Information</a></div><div id="showings_navigation_scroll_florian_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'florian\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Mag Grotesque</div><em>Mag</em> is a Grotesque type family, featuring 15 styles from Bold Extended to Thin Condensed, including 2 different Italics. The idea was to create an expressive type family which provides strong contrast between all styles, in terms of width, weight and contrast.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Florian Schick</div><div class="content_descriptions_text">Florian Schick studied graphic design at the <em>University of Applied Sciences and Arts</em> in Hannover and the <em>Royal Academy of Arts</em> (KABK), Den Haag, from which he graduated with distinction in 2010. Since 2006 he has been working as a freelance designer and founded his type foundry <em>Schickfonts</em> in 2008. In fall 2011 he will start a design studio in Berlin with <em>Lauri Toikka</em>.</div><div class="content_descriptions_text"><em>Florian on the web: </em><a href="#" target="_blank">http://www.schickfonts.com</a></div></div></div>';
            students['florian']['currentshowing'] = 0;
            studentshortnames.push('yassin');
            students['yassin'] = Array();
            students['yassin']['index'] = 4;
            students['yassin']['longname'] = 'Yassin Baggar';
            students['yassin']['content'] = '<div id="showings_yassin" class="showings"><iframe src="img/svgz/01_bois.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_yassin" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'yassin\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'yassin\', 1);">&rarr;</a></div><div id="showings_navigation_counter_yassin" class="showings_navigation_buttons">1 of 10</div><div id="showings_navigation_scroll_yassin_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'yassin\');">&darr; Information</a></div><div id="showings_navigation_scroll_yassin_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'yassin\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Bois</div>Bois is a Roman Antiqua flirting with Gothic influences. The design, based on calligraphy and craftsmanship, was inspired by the works of <em>Villu Toots</em>, <em>Rudolf Koch</em>, <em>Oldrich Menhart</em>, and <em>William Morris</em>. The name Bois, French for &rsaquo;wood&lsaquo;, stands for the natural and solid aspect of the typeface. Also, <em>Robin Hood</em> is called &rsaquo;Robin des Bois&lsaquo; in French.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Yassin Baggar</div><div class="content_descriptions_text">Yassin Baggar is a Swiss graphic and type designer. Before joining Type]Media, he has worked for different studios in Berlin. Next, he plans to start the <em>fatype</em> foundry with <em>Anton Koovit</em> and <em>Christian Bordeaux</em>, and continue working between type and graphic.</div><div class="content_descriptions_text"><em>Yassin on the web: </em><a href="#" target="_blank">http://www.ybaggar.com</a></div><div class="content_descriptions_text"><em>Yassin on Twitter: </em><a href="#" target="_blank">@ybaggar</a></div></div></div>';
            students['yassin']['currentshowing'] = 0;
            studentshortnames.push('emma');
            students['emma'] = Array();
            students['emma']['index'] = 5;
            students['emma']['longname'] = 'Emma Laiho';
            students['emma']['content'] = '<div id="showings_emma" class="showings"><iframe src="img/svgz/taiga00.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_emma" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'emma\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'emma\', 1);">&rarr;</a></div><div id="showings_navigation_counter_emma" class="showings_navigation_buttons">1 of 9</div><div id="showings_navigation_scroll_emma_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'emma\');">&darr; Information</a></div><div id="showings_navigation_scroll_emma_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'emma\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Taiga</div>Taiga is a type family for books, especially fiction books and poetry. It consists of four styles: Roman, Italic, Bold and a Text Italic. The Text Italic is a parallel style to the Roman, intended for setting longer italic captions, translations, or wherever you need a second, more informal tone of voice.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Emma Laiho</div><div class="content_descriptions_text">Emma Laiho studied in <em>Aalto University School of Art and Design</em> in Helsinki but caught the type fever during her exchange studies at the <em>Royal Academy of Arts</em> (KABK), Den Haag. A couple of years later it was time to return to the Netherlands for Type]Media. Her graphic design work has been concentrated on editorial and book design, so it is logical that her main focus in type design so far has been learning the intricacies of text type.</div><div class="content_descriptions_text"><em>Emma on the web: </em><a href="#" target="_blank">http://www.emmalaiho.net</a></div><div class="content_descriptions_text"><em>Emma on Twitter: </em><a href="#" target="_blank">@emmalaiho</a></div></div></div>';
            students['emma']['currentshowing'] = 0;
            studentshortnames.push('marina');
            students['marina'] = Array();
            students['marina']['index'] = 6;
            students['marina']['longname'] = 'Marina Chaccur';
            students['marina']['content'] = '<div id="showings_marina" class="showings"><iframe src="img/svgz/Chic_01.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_marina" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'marina\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'marina\', 1);">&rarr;</a></div><div id="showings_navigation_counter_marina" class="showings_navigation_buttons">1 of 9</div><div id="showings_navigation_scroll_marina_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'marina\');">&darr; Information</a></div><div id="showings_navigation_scroll_marina_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'marina\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Chic</div>Chic is a type system that explores different styles featured in a woman&rsquo;s wardrobe. Dress up your page with chic.basique, which is a basic, easy-going Sans for text, that can be combined with chic.pretaporter as a more elegant, well-fitted display Serif. And finally, to add a statement piece to the collection, there is the chic.couture as a custom-made set of ornamented capitals. </div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Marina Chaccur</div><div class="content_descriptions_text">Marina is a Brazilian graphic designer and teacher, graduated at <em>Funda&ccedil;&atilde;o Armando Alvares Penteado &ndash; FAAP</em>, and with an MA from the <em>London College of Communication</em>. For the past years she has been involved in conferences, lectures, workshops and exhibitions in Brazil and abroad. Currently she works as a freelance designer and also <em>ATypI</em> board member.</div><div class="content_descriptions_text"><em>Marina on the web: </em><a href="#" target="_blank">http://marinachaccur.com</a></div><div class="content_descriptions_text"><em>Marina on Twitter: </em><a href="#" target="_blank">@mchaccur</a></div></div></div>';
            students['marina']['currentshowing'] = 0;
            studentshortnames.push('alp');
            students['alp'] = Array();
            students['alp']['index'] = 7;
            students['alp']['longname'] = 'Alpkan Kirayoglu';
            students['alp']['content'] = '<div id="showings_alp" class="showings"><img class="showing" src="img/showings/00_Baron.png" width="900" height="560" /></div><div class="clear"><div id="showings_navigation_alp" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'alp\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'alp\', 1);">&rarr;</a></div><div id="showings_navigation_counter_alp" class="showings_navigation_buttons">1 of 4</div><div id="showings_navigation_scroll_alp_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'alp\');">&darr; Information</a></div><div id="showings_navigation_scroll_alp_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'alp\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Baron Grande</div>Baron is a modern display typeface inspired by super-ellipse shaped typefaces by <em>Hermann Zapf</em> such as <em>Melior</em> and <em>Zapf Elliptical</em>. Intended to be used in large sizes, Baron tries to differ from early pointed pen models with its friendly terminals and some asymmetric counters. Baron family consists of Baron Regular, Italic, and Bold.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Alpkan Kirayoglu</div><div class="content_descriptions_text">After finishing high school in Istanbul, Alpkan moved abroad and studied graphic design at several art schools such as <em>School of Visual Arts</em> in New York and <em>Rhode Island School of Design</em> in Providence. After finishing college, Alp worked for <em>Poulin+Morris</em>, a New York graphic design studio focusing on environmental design projects.</div><div class="content_descriptions_text"><em>Alpkan on the web: </em><a href="#" target="_blank">http://alpabets.com</a></div></div></div>';
            students['alp']['currentshowing'] = 0;
            studentshortnames.push('colin');
            students['colin'] = Array();
            students['colin']['index'] = 8;
            students['colin']['longname'] = 'Colin M. Ford';
            students['colin']['content'] = '<div id="showings_colin" class="showings"><img class="showing" src="img/showings/00_Civilian.png" width="900" height="560" /></div><div class="clear"><div id="showings_navigation_colin" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'colin\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'colin\', 1);">&rarr;</a></div><div id="showings_navigation_counter_colin" class="showings_navigation_buttons">1 of 7</div><div id="showings_navigation_scroll_colin_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'colin\');">&darr; Information</a></div><div id="showings_navigation_scroll_colin_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'colin\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Civilian</div>Civilian is a typeface developed specifically for use on blogs. The design takes into account the pixel grid of the screen while incorporating soft, personable curves to underline the significance of the person behind the website. In addition to the standard family of Regular, Italic, Bold, Bold Italic, Civilian also includes icons and stylistic sets that the designer might find useful when developing a website.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Colin M. Ford</div><div class="content_descriptions_text">Colin has been designing websites since the Dot Com boom, when he was about 12 years old. At 21, he was introduced to the world of typeface design by the punk rock design duo <em>Post Typography</em> while studying at the <em>Maryland Institute College of Art</em> and has since never put down the pen tool. These days he has found his niche exploring the intersections between the worlds of the web and of typeface design.</div><div class="content_descriptions_text"><em>Colin on the web: </em><a href="#" target="_blank">http://colinmford.com</a></div><div class="content_descriptions_text"><em>Colin on Twitter: </em><a href="#" target="_blank">@colinmford</a></div></div></div>';
            students['colin']['currentshowing'] = 0;
            studentshortnames.push('kunihiko');
            students['kunihiko'] = Array();
            students['kunihiko']['index'] = 9;
            students['kunihiko']['longname'] = 'Kunihiko Okano';
            students['kunihiko']['content'] = '<div id="showings_kunihiko" class="showings"><img class="showing" src="img/showings/00_Quintet.png" width="900" height="560" /></div><div class="clear"><div id="showings_navigation_kunihiko" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'kunihiko\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'kunihiko\', 1);">&rarr;</a></div><div id="showings_navigation_counter_kunihiko" class="showings_navigation_buttons">1 of 16</div><div id="showings_navigation_scroll_kunihiko_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'kunihiko\');">&darr; Information</a></div><div id="showings_navigation_scroll_kunihiko_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'kunihiko\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Quintet</div>Quintet is a type family consisting of a Script typeface, a Serif Roman and Italic. The Script typeface is based on the double-pencil technique and looks double-stroke but consists of a single stroke. The Script variations have completely same letter widths and kerning values to be used as a layer font. The Serif style works for a subhead or body text. Quintet is suitable for packaging design for wines, sweets and cosmetics.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Kunihiko Okano</div><div class="content_descriptions_text">Kunihiko graduated from <em>Kyoto City University of Arts</em> in 1995. After working as a packaging designer for about a decade, he started his design office <em>Shotype Design</em> in 2008 and has been providing Latin parts to Japanese type foundries.</div><div class="content_descriptions_text"><em>Kunihiko on the web: </em><a href="#" target="_blank">http://www.shotype.com</a></div><div class="content_descriptions_text"><em>Kunihiko on Twitter: </em><a href="http://twitter.com/Shotype_EN" target="_blank">@Shotype_EN</a></div></div></div>';
            students['kunihiko']['currentshowing'] = 0;
            studentshortnames.push('linda');
            students['linda'] = Array();
            students['linda']['index'] = 10;
            students['linda']['longname'] = 'Linda Hintz';
            students['linda']['content'] = '<div id="showings_linda" class="showings"><iframe src="img/svgz/Website_Linda01.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_linda" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'linda\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'linda\', 1);">&rarr;</a></div><div id="showings_navigation_counter_linda" class="showings_navigation_buttons">1 of 6</div><div id="showings_navigation_scroll_linda_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'linda\');">&darr; Information</a></div><div id="showings_navigation_scroll_linda_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'linda\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Ernest, Ernie and Ernesto</div>This family consists of three members of very different kind: <em>Ernest</em> is a transitional text cut for continuous reading, modest and quite quiet in appearance. His little fellow <em>Ernie</em> is made for small sizes in captions with simplyfied letterforms. In contrast <em>Ernesto</em> works as an image in displaysizes, being a caps only cut with playful alternatives to give a splendid impression.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Linda Hintz</div><div class="content_descriptions_text">Linda studied at <em>HfG Schw&auml;bisch Gm&uuml;nd</em>, internships took her exploring classical graphic design at <em>Atelier Anton Stankowski</em> and signage systems at <em>Int&eacute;gral Ruedi Baur et Associ&eacute;s</em>. Since graduation in 2007 she worked professionally designing books, magazines, catalogues, businesscards, exhibitions, posters, pictograms and all kind of other things for both big and small clients. A course with <em>Luc[as] de Groot</em> led her to Den Haag to find out more about type.</div><div class="content_descriptions_text"><em>Linda on the web: </em><a href="#" target="_blank">http://www.lindahintz.com</a></div></div></div>';
            students['linda']['currentshowing'] = 0;
            studentshortnames.push('lauri');
            students['lauri'] = Array();
            students['lauri']['index'] = 11;
            students['lauri']['longname'] = 'Lauri Toikka';
            students['lauri']['content'] = '<div id="showings_lauri" class="showings"><iframe src="img/svgz/01_Colette.svgz" width="900" height="560" scrolling="no"></iframe></div><div class="clear"><div id="showings_navigation_lauri" class="showings_navigation"><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'lauri\', -1);">&larr;</a></div><div class="showings_navigation_buttons"><a href="JavaScript:changeShowing(\'lauri\', 1);">&rarr;</a></div><div id="showings_navigation_counter_lauri" class="showings_navigation_buttons">1 of 14</div><div id="showings_navigation_scroll_lauri_down" class="showings_navigation_buttons showings_navigation_scroll"><a onclick="contentScrollDown(\'lauri\');">&darr; Information</a></div><div id="showings_navigation_scroll_lauri_up" class="showings_navigation_buttons showings_navigation_scroll showings_navigation_scroll_down"><a onclick="contentScrollUp(\'lauri\');">&uarr; Showings</a></div></div></div><div class="content_descriptions clear"><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the typeface :</div><div class="content_descriptions_title">Colette</div>Colette is a transitional type family with text and display cuts. It plays with the contrast of spiky terminals and round curves. In the display variant contrast is pushed to the maximum whereas text weights are optimized for good readability while still preserving Colette&rsquo;s sharp character.</div><div class="content_descriptions_columns"><div class="content_descriptions_title_about">About the designer :</div><div class="content_descriptions_title">Lauri Toikka</div><div class="content_descriptions_text">Lauri is a Finnish graphic designer. Originally from Helsinki, Lauri studied in <em>Lahti Institute of Design</em> and graduated in spring 2010. After Type]Media Lauri will move to Berlin to start graphic design studio/type foundry with his classmate <em>Florian Schick</em>.</div><div class="content_descriptions_text"><em>Lauri on the web: </em><a href="http://www.lauritoikka.com" target="_blank">http://www.lauritoikka.com</a></div></div></div>';
            students['lauri']['currentshowing'] = 0;
            students['sun']['showings'] = Array('<img class="showing" src="img/showings/01_showing_sun.png" width="900" height="560" />', '<iframe src="img/svgz/02_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/03_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/05_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/06_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/07_showing_sun.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/08_showing_sun.jpg" width="900" height="560" />');
            students['malte']['showings'] = Array('<img class="showing" src="img/showings/00_Cassise.jpg" width="900" height="560" />', '<img class="showing" src="img/showings/01_Cassise.jpg" width="900" height="560" />', '<img class="showing" src="img/showings/02_Cassise.jpg" width="900" height="560" />', '<iframe src="img/svgz/03_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/05_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/06_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/07_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/08_Cassise.jpg" width="900" height="560" />', '<img class="showing" src="img/showings/09_Cassise.jpg" width="900" height="560" />', '<iframe src="img/svgz/10_Cassise.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['yanone']['showings'] = Array('<iframe src="http://player.vimeo.com/video/24883117?title=0&amp;byline=0&amp;portrait=0&amp;color=faa810" width="900" height="560" frameborder="0"></iframe>', '<iframe src="img/svgz/900x560-Curry.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/900x560-Faust.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/900x560-Sinalco.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/900x560-ValveMusic.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/900x560-Vita-Cola.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/a_rockpaperscissors.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/a_rockpaperscissors2.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/aa_regularitalicbold.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/connections.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/connections2.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/connections3.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/connections4.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/makethetypebigger.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/makethetypebigger2.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['florian']['showings'] = Array('<iframe src="img/svgz/florian_schick_01.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_02.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_03.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_04.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_05.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_06.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_07.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_08.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_09.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_10.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_11.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_12.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/florian_schick_13.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['yassin']['showings'] = Array('<iframe src="img/svgz/01_bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/02_bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/03_Bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_Bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/05_Bois.png" width="900" height="560" />', '<iframe src="img/svgz/06_Bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/07_Bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/08_Bois.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/09_Bois.png" width="900" height="560" />', '<iframe src="img/svgz/10_Bois.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['emma']['showings'] = Array('<iframe src="img/svgz/taiga00.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga01.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga02.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga03.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga04.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga05.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga06.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga07.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/taiga08.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['marina']['showings'] = Array('<iframe src="img/svgz/Chic_01.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_02.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_03.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_04.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_05.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_06.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_07.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_08.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Chic_09.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['alp']['showings'] = Array('<img class="showing" src="img/showings/00_Baron.png" width="900" height="560" />', '<img class="showing" src="img/showings/01_Baron.pdf.png" width="900" height="560" />', '<img class="showing" src="img/showings/02_Baron.pdf.png" width="900" height="560" />', '<img class="showing" src="img/showings/03_Baron.pdf.png" width="900" height="560" />');
            students['colin']['showings'] = Array('<img class="showing" src="img/showings/00_Civilian.png" width="900" height="560" />', '<iframe src="img/svgz/01_Civilian.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/02_Civilian.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/03_Civilian.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_Civilian.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/05_Civilian.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/06_Civilian.png" width="900" height="560" />');
            students['kunihiko']['showings'] = Array('<img class="showing" src="img/showings/00_Quintet.png" width="900" height="560" />', '<iframe src="img/svgz/01_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/02_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/03_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/05_Quintet.png" width="900" height="560" />', '<iframe src="img/svgz/06_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/07_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/08_Quintet.gif" width="900" height="560" />', '<img class="showing" src="img/showings/09_Quintet.jpg" width="900" height="560" />', '<iframe src="img/svgz/11_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/12_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/13_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/14_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/15_Quintet.svgz" width="900" height="560" scrolling="no"></iframe>', '<img class="showing" src="img/showings/16_Quintet.png" width="900" height="560" />');
            students['linda']['showings'] = Array('<iframe src="img/svgz/Website_Linda01.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Website_Linda02.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Website_Linda03.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Website_Linda04.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Website_Linda05.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/Website_Linda06.svgz" width="900" height="560" scrolling="no"></iframe>');
            students['lauri']['showings'] = Array('<iframe src="img/svgz/01_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/02_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/03_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/04_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/05_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/06_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/07_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/08_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/09_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/10_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/11_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/12_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/13_Colette.svgz" width="900" height="560" scrolling="no"></iframe>', '<iframe src="img/svgz/14_Colette.svgz" width="900" height="560" scrolling="no"></iframe>');</script><style type="text/css">#showings_navigation_marina a {
                color: #f05d32;
            }
            #content_sun a {
                color: #ffce00;
            }
            #content_yassin a {
                color: #f58321;
            }
            #showings_navigation_colin a {
                color: #eb3842;
            }
            .kunihiko {
                background-color: #e8254b;
            }
            #content_malte a {
                color: #fcbb08;
            }
            #content_kunihiko a {
                color: #e8254b;
            }
            #showings_navigation_sun a {
                color: #ffce00;
            }
            #showings_navigation_malte a {
                color: #fcbb08;
            }
            .poster .bigletter {
                width: 500px;
            }
            #showings_navigation_lauri a {
                color: #e4005c;
            }
            #showings_navigation_linda a {
                color: #e61253;
            }
            .poster .longname {
                width: 500px;
            }
            .content {
                width: 900px;
            }
            .colin {
                background-color: #eb3842;
            }
            .lauri {
                background-color: #e4005c;
            }
            #content_linda a {
                color: #e61253;
            }
            html,body {
                width: 7800px;
            }
            .alp {
                background-color: #ed4a3a;
            }
            #content_colin a {
                color: #eb3842;
            }
            .emma {
                background-color: #f27029;
            }
            .yassin {
                background-color: #f58321;
            }
            #showings_navigation_emma a {
                color: #f27029;
            }
            #showings_navigation_yanone a {
                color: #faa810;
            }
            #showings_navigation_yassin a {
                color: #f58321;
            }
            #content_alp a {
                color: #ed4a3a;
            }
            .marina {
                background-color: #f05d32;
            }
            .yanone {
                background-color: #faa810;
            }
            #content_emma a {
                color: #f27029;
            }
            #showings_navigation_florian a {
                color: #f79519;
            }
            #content_marina a {
                color: #f05d32;
            }
            .linda {
                background-color: #e61253;
            }
            #content_yanone a {
                color: #faa810;
            }
            .poster {
                width: 500px;
            }
            .malte {
                background-color: #fcbb08;
            }
            .sun {
                background-color: #ffce00;
            }
            #content_florian a {
                color: #f79519;
            }
            #content_lauri a {
                color: #e4005c;
            }
            .florian {
                background-color: #f79519;
            }
            #showings_navigation_kunihiko a {
                color: #e8254b;
            }
            #showings_navigation_alp a {
                color: #ed4a3a;
            }
        </style>
    </head>
    <body>
        <div id="fixedfinder">
            <div class="finder_inner">
                <div id="fixedfinder_item_sun" onclick="openStudent('sun')" class="finder_item">L</div>
                <div id="fixedfinder_item_malte" onclick="openStudent('malte')" class="finder_item">S</div>
                <div id="fixedfinder_item_yanone" onclick="openStudent('yanone')" class="finder_item">a</div>
                <div id="fixedfinder_item_florian" onclick="openStudent('florian')" class="finder_item">N</div>
                <div id="fixedfinder_item_yassin" onclick="openStudent('yassin')" class="finder_item">S</div>
                <div id="fixedfinder_item_emma" onclick="openStudent('emma')" class="finder_item">i</div>
                <div id="fixedfinder_item_marina" onclick="openStudent('marina')" class="finder_item">T</div>
                <div id="fixedfinder_item_alp" onclick="openStudent('alp')" class="finder_item">I</div>
                <div id="fixedfinder_item_colin" onclick="openStudent('colin')" class="finder_item">O</div>
                <div id="fixedfinder_item_kunihiko" onclick="openStudent('kunihiko')" class="finder_item">n</div>
                <div id="fixedfinder_item_linda" onclick="openStudent('linda')" class="finder_item">A</div>
                <div id="fixedfinder_item_lauri" onclick="openStudent('lauri')" class="finder_item">l</div>
            </div>
            <div class="finder_inner_bottom">
                <div onclick="$('html,body').animate({scrollLeft: 0}, 500, function() {
                            scrolling();
                        });" class="finder_item">
                    <img width="20" src="img/pix/arrow.png" height="20"/>
                </div>
                <div onclick="Maximize();" class="finder_item finder_item_maximize">
                    <img id="maximize_button" width="20" src="img/pix/maximize.png" height="20"/>
                </div>
            </div>
        </div>
        <div class="finder">
            <div class="finder_inner">
                <div id="finder_item_sun" onclick="openStudent('sun')" class="finder_item">Li Peng Yan</div>
                <div id="finder_item_malte" onclick="openStudent('malte')" class="finder_item">Student</div>
                <div id="finder_item_yanone" onclick="openStudent('yanone')" class="finder_item">finder3</div>
                <div id="finder_item_florian" onclick="openStudent('florian')" class="finder_item">Florian Schick</div>
                <div id="finder_item_yassin" onclick="openStudent('yassin')" class="finder_item">Yassin Baggar</div>
                <div id="finder_item_emma" onclick="openStudent('emma')" class="finder_item">Emma Laiho</div>
                <div id="finder_item_marina" onclick="openStudent('marina')" class="finder_item">Marina Chaccur</div>
                <div id="finder_item_alp" onclick="openStudent('alp')" class="finder_item">Alpkan Kirayoglu</div>
                <div id="finder_item_colin" onclick="openStudent('colin')" class="finder_item">Colin M. Ford</div>
                <div id="finder_item_kunihiko" onclick="openStudent('kunihiko')" class="finder_item">Kunihiko Okano</div>
                <div id="finder_item_linda" onclick="openStudent('linda')" class="finder_item">Linda Hintz</div>
                <div id="finder_item_lauri" onclick="openStudent('lauri')" class="finder_item">Lauri Toikka</div>
            </div>
        </div>
        <div id="poster_sun" class="poster sun">
            <a href="JavaScript:openStudent('sun')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/ChicCouture-Regular_l.svgz"/>
                    </div>
                    <div class="longname">Li Peng Yan</div>
                </div>
            </a>
        </div>
        <div id="content_sun" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_malte" class="poster malte">
            <a href="JavaScript:openStudent('malte')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/ChicCouture-Regular_s.svgz"/>
                    </div>
                    <div class="longname">student</div>
                </div>
            </a>
        </div>
        <div id="content_malte" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_yanone" class="poster yanone">
            <a href="JavaScript:openStudent('yanone')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Heat-Regular_a.svgz"/>
                    </div>
                    <div class="longname">Yanone</div>
                </div>
            </a>
        </div>
        <div id="content_yanone" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_florian" class="poster florian">
            <a href="JavaScript:openStudent('florian')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/MagGrotesk-BlackItalicA_n.svgz"/>
                    </div>
                    <div class="longname">Florian Schick</div>
                </div>
            </a>
        </div>
        <div id="content_florian" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_yassin" class="poster yassin">
            <a href="JavaScript:openStudent('yassin')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Bois03-Black_s.svgz"/>
                    </div>
                    <div class="longname">Yassin Baggar</div>
                </div>
            </a>
        </div>
        <div id="content_yassin" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_emma" class="poster emma">
            <a href="JavaScript:openStudent('emma')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Taiga-TextItalic_i.svgz"/>
                    </div>
                    <div class="longname">Emma Laiho</div>
                </div>
            </a>
        </div>
        <div id="content_emma" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_marina" class="poster marina">
            <a href="JavaScript:openStudent('marina')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/ChicCouture-Regular_t.svgz"/>
                    </div>
                    <div class="longname">Marina Chaccur</div>
                </div>
            </a>
        </div>
        <div id="content_marina" class="content">
            <div class="content_inner"></div>
        </div>
        <div id="poster_alp" class="poster alp">
            <a href="JavaScript:openStudent('alp')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Baron-Regular_i.svgz"/>
                    </div>
                    <div class="longname">Alpkan Kirayoglu</div>
                </div>
            </a>

        </div>
        <div id="content_alp" class="content">
            <div class="content_inner"></div>

        </div>
        <div id="poster_colin" class="poster colin">
            <a href="JavaScript:openStudent('colin')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Civilian-Regular_o.svgz"/>
                    </div>
                    <div class="longname">Colin M. Ford</div>

                </div>
            </a>

        </div>
        <div id="content_colin" class="content">
            <div class="content_inner"></div>

        </div>
        <div id="poster_kunihiko" class="poster kunihiko">
            <a href="JavaScript:openStudent('kunihiko')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/QuintetSerif-HeavyItalic_n.svgz"/>
                    </div>
                    <div class="longname">Kunihiko Okano</div>

                </div>
            </a>

        </div>
        <div id="content_kunihiko" class="content">
            <div class="content_inner"></div>

        </div>
        <div id="poster_linda" class="poster linda">
            <a href="JavaScript:openStudent('linda')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Ernesto-Regular_a.svgz"/>
                    </div>
                    <div class="longname">Linda Hintz</div>

                </div>
            </a>

        </div>
        <div id="content_linda" class="content">
            <div class="content_inner"></div>

        </div>
        <div id="poster_lauri" class="poster lauri">
            <a href="JavaScript:openStudent('lauri')">
                <div class="poster_inner">
                    <div class="bigletter">
                        <img src="img/svgz/fontType/Colette-Black_l.svgz"/>
                    </div>
                    <div class="longname">Lauri Toikka</div>

                </div>
            </a>

        </div>
        <div id="content_lauri" class="content">
            <div class="content_inner"></div>

        </div>
        <div style="width: 1200px;" class="end poster">
            <div class="end_inner">
                <div class="title">We would like to thank<br/>all our teachers and contributors:</div><br>
                <div>
                    Akiem&nbsp;Helmling, Alessandro&nbsp;Colizzi, Bas&nbsp;Jacobs, Christian&nbsp;Schwartz, Christoph&nbsp;Noordzij, Donald&nbsp;Beekman, Erik&nbsp;van&nbsp;
                    Blokland, Fran&ccedil;oise&nbsp;Berserik, Frank&nbsp;Blokland, Fred&nbsp;Smeijers, Frederik&nbsp;Berlaen, Gerard&nbsp;Unger, Indra&nbsp;Kupferschmid, Jan&nbsp;
                    de&nbsp;Jong, Jan&nbsp;Willem&nbsp;Stas, Johan&nbsp;de&nbsp;Zoete, Just&nbsp;van&nbsp;Rossum, Kris&nbsp;Sowersby, Liza&nbsp;Enebeis, Luc[as]&nbsp;de&nbsp;
                    Groot, Mathieu&nbsp;Lommen, Miguel&nbsp;Sousa, Paul&nbsp;Barnes, Paul&nbsp;van&nbsp;der&nbsp;Laan, Peter&nbsp;Bi&#x013E;ak, Peter&nbsp;Matthias&nbsp;
                    Noordzij, Peter&nbsp;Verheul, Petr&nbsp;van&nbsp;Blokland, Rejane&nbsp;Dal&nbsp;Bello, Rick&nbsp;Vermeulen, Rickey&nbsp;Tax, S&eacute;bastien&nbsp;
                    Morlighem, Tal&nbsp;Leming
                </div>
                <p>Like us: 
                    <span class="like">
                        <a href="#">
                            <img src="img/pix/twitter.gif" width="50" height="50"/>
                        </a>
                    </span> 
                    <span class="like">
                        <!--lzb-->
                        <g:plusone size="tall"></g:plusone>
                        <a></a> 
                        <span class="like">
                            <span id="fb-root"></span>
                            <!--<script src="http://connect.facebook.net/en_US/all.js#appId=174654505932327&amp;xfbml=1"></script>-->
                            <script src="js/all.js"></script>
                            <fb:like href="#" send="true" width="450" show_faces="true" colorscheme="dark" font=""></fb:like>
                        </span>
                    </span>
                </p>
            </div>
        </div>
        <div style="width: 400px;" class="end poster">
            <div style="position:relative;top:50%;" class="end_inner">
                <img src="img/pix/madewithpython.gif"/>
            </div>
        </div>
    </body>
</html>
<!--http://typemedia2011.com/data/bigletters/QuintetScript-Alto_t.svgz-->
<!--http://typemedia2011.com/data/bigletters/Superhero-Cimento_k.svgz-->