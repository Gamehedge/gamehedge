{$header}
<main>
    <div class="container">
        <h1 class="text-center">{$title}</h1>
        <section id="contact-us">
            <div class="row">
                <div class="col-md-12 text-center" style="font-size:18px; margin-bottom:10px;">
                    <img width="40px" src="/assets/img/icon_home.png"><div style="display:inline; margin-left:10px;">GameHedde 1460 Broadway New York, NY 10036</div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-12 text-center">
                        <img width="100" src="/assets/img/phone_icon_grey.png">
                    </div>
                    <div class="col-md-12 text-center">
                        <h3>908-312-FANS (3267)</h3>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-12 text-center">
                        <img width="100" src="/assets/img/email_icon_grey.png">
                    </div>
                    <div class="col-md-12 text-center">
                        <h3><a href="mailto:support@gamehedge.com">support@gamehedge.com</a></h3>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12"><h2 class="text-center">- OR -</h2></div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <form class="form-horizontal" role="form" method="post" action="/contact-send" id="contactForm">
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" value="" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="message" class="col-sm-2 control-label">Message</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="4" name="message" required></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="human" class="col-sm-2 control-label">{$value_1} + {$value_2} = ?</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control myCustomRule" id="human" name="human" placeholder="Your Answer" required autocomplete='off'>
                                <input type="hidden" name="human_1" id="human_1" value="{$value_1}">
                                <input type="hidden" name="human_2" id="human_2" value="{$value_2}">
                                <input type="hidden" name="human_answer" id="human_answer" value="{$answer}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2">
                                <input id="submit" name="submit" type="submit" value="Send" class="btn btn-primary">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</main>
{$footer}